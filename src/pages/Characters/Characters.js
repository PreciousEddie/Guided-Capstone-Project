import React, { useState, useEffect } from "react";
import IceAndFireApi from "../../services/IceAndFireApi";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";

const Characters = () => {
    const [characters, setCharacters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalCharacters, setTotalCharacters] = useState(0);
    const [error, setError] = useState(null);

    const totalPages = Math.ceil(totalCharacters / pageSize);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await IceAndFireApi.getCharactersWithPagination(currentPage, pageSize);
                setCharacters(response.data);
                setTotalCharacters(response.total);
            } catch (error) {
                setError("Error fetching characters. Please try again later.");
            }
        };

        fetchCharacters();
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
            <h1>Characters of Westeros and Beyond</h1>
            { error && <p>{ error }</p> }
            <ul>
                { characters.map((character) => (
                    <li key={ character.url }>
                        <Link to={ `/characters/${character.url.split("/").pop()}` }>
                            { character.name || (character.aliases.length > 0 ? character.aliases[0] : "Unnamed") }
                            <br />
                            Culture: { character.culture || "Unknown" }
                            <br />
                            Gender: { character.gender === "male" ? "♂️" : character.gender === "female" ? "♀️" : "Unknown" }
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

export default Characters;
