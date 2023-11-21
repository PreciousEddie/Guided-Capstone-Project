import React, { useState, useEffect } from "react";
import IceAndFireApi from "../../services/IceAndFireApi";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import { Container, Row, Col, Card, Form } from "react-bootstrap";

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
                console.log("API Response:", response);
                console.log("currentPage:", currentPage);
                console.log("totalPages:", Math.ceil(response.total / pageSize));
                console.log("Character URLs:", response.data.map(character => character.url));
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
        <Container>
            <h1 className="mt-5 mb-4">Characters of Westeros and Beyond</h1>
            {error && <p className="text-danger">{error}</p>}
            <Row>
                {characters.map((character) => (
                    <Col key={character.url} md={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <Link to={`/character/${character.url.split("/").pop()}`}>
                                        {character.name || (character.aliases.length > 0 ? character.aliases[0] : "Unnamed")}
                                    </Link>
                                </Card.Title>
                                <Card.Text>
                                    Culture: {character.culture || "Unknown"}
                                    <br />
                                    Gender: {character.gender === "Male" ? "♂️" : character.gender === "Female" ? "♀️" : "Unknown"}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            <Form>
                <Form.Group controlId="pageSizeSelect" className="mt-3">
                    <Form.Label>Characters per page:</Form.Label>
                    <Form.Control as="select" value={pageSize} onChange={(e) => handlePageSizeChange(parseInt(e.target.value, 10))}>
                        <option value={10}>10 per page</option>
                        <option value={20}>20 per page</option>
                        <option value={50}>50 per page</option>
                    </Form.Control>
                </Form.Group>
            </Form>
        </Container>
    );
};

export default Characters;
