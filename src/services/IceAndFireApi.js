import axios from "axios";

const BASE_URL = "https://www.anapioficeandfire.com/api";

const IceAndFireApi = {
    getCharactersWithPagination: async (page, pageSize) => {
        const response = await axios.get(`${BASE_URL}/characters`, {
            params: {
                page,
                pageSize,
            },
        });
        return {
            data: response.data,
            total: parseInt(response.headers["x-total-count"], 10),
        };
    },

    getHousesWithPagination: async (page, pageSize) => {
        const response = await axios.get(`${BASE_URL}/houses`, {
            params: {
                page,
                pageSize,
            },
        });
        return {
            data: response.data,
            total: parseInt(response.headers["x-total-count"], 10),
        };
    },
};

export default IceAndFireApi;
