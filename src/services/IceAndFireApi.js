import axios from "axios";

const BASE_URL = "https://www.anapioficeandfire.com/api";

const IceAndFireApi = {
    getCharactersWithPagination: async (page, pageSize) => {
        try {
            const response = await axios.get(`${BASE_URL}/characters`, {
                params: {
                    page,
                    pageSize,
                },
            });

            const total = response.headers["x-total-count"] !== undefined ?
                parseInt(response.headers["x-total-count"], 10) : 0;

            if (isNaN(total)) {
                console.error("Invalid total count from API:", response.headers["x-total-count"]);
                throw new Error("Invalid total count from API");
            }

            return {
                data: response.data,
                total,
            };
        } catch (error) {
            console.error("Error fetching characters:", error.message);
            throw new Error("Error fetching characters. Please try again later.");
        }
    },

    getHousesWithPagination: async (page, pageSize) => {
        try {
            const response = await axios.get(`${BASE_URL}/houses`, {
                params: {
                    page,
                    pageSize,
                },
            });

            const total = response.headers["x-total-count"] !== undefined ?
                parseInt(response.headers["x-total-count"], 10) : 0;

            if (isNaN(total)) {
                console.error("Invalid total count from API:", response.headers["x-total-count"]);
                throw new Error("Invalid total count from API");
            }

            return {
                data: response.data,
                total,
            };
        } catch (error) {
            console.error("Error fetching houses:", error.message);
            throw new Error("Error fetching houses. Please try again later.");
        }
    },

    getCharacterByUrl: async (url) => {
        const response = await axios.get(url);
        return response.data;
    },

    getCharacterById: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/characters/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching character by ID:", error.message);
            throw new Error("Error fetching character. Please try again later.");
        }
    },

    getAllegianceByUrl: async (url) => {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error(`Error fetching allegiance by URL (${url}):`, error.message);
            throw new Error("Error fetching allegiance. Please try again later.");
        }
    },

};

export default IceAndFireApi;
