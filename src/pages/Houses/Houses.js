import React, { useState, useEffect } from "react";
import IceAndFireApi from "../../services/IceAndFireApi";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";

const Houses = () => {
    const [houses, setHouses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalHouses, setTotalHouses] = useState(0); // Initialize totalHouses
    const [error, setError] = useState(null);

    const totalPages = Math.ceil(totalHouses / pageSize); // Calculate totalPages

    useEffect(() => {
        const fetchHouses = async () => {
            try {
                const response = await IceAndFireApi.getHousesWithPagination(currentPage, pageSize);
                if (response.data.length === 0) {
                    console.log("No more houses to list.");
                } else {
                    setHouses(response.data);
                    setTotalHouses(response.total); // Set the totalHouses
                }
            } catch (err) {
                setError("Error fetching houses. Please try again later.");
            }
        };

        fetchHouses();
    }, [currentPage, pageSize]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handlePageSizeChange = (newSize) => {
        setPageSize(newSize);
        setCurrentPage(1);
    };

    return (
        <div>
            <h1>Houses of Westeros and Beyond</h1>
            { error && <p>{ error }</p> }
            <ul>
                { houses.map((house) => (
                    <li key={ house.url }>
                        <Link to={ `/houses/${house.url.split("/").pop()}` }>
                            <strong>{ house.name }</strong>
                            <br />
                            Titles: { house.titles.join(", ") || "No Titles" }
                            <br />
                            Current Lord:{ " " }
                            { house.currentLord ? (
                                <Link to={ `/characters/${house.currentLord.split("/").pop()}` }>View</Link>
                            ) : (
                                "N/A"
                            ) }
                            <br />
                            Sworn Members:{ " " }
                            { house.swornMembers &&
                                house.swornMembers.map((member) => (
                                    <Link key={ member } to={ `/characters/${member.split("/").pop()}` }>
                                        View
                                    </Link>
                                )) }
                        </Link>
                    </li>
                )) }
            </ul>
            { currentPage < totalPages && (
                <Pagination currentPage={ currentPage } totalPages={ totalPages } onPageChange={ handlePageChange } />
            ) }
            <select
                value={ pageSize }
                onChange={ (e) => handlePageSizeChange(parseInt(e.target.value, 10)) }
            >
                <option value={ 10 }>10 per page</option>
                <option value={ 20 }>20 per page</option>
                <option value={ 50 }>50 per page</option>
            </select>
        </div>
    );
};

export default Houses;
