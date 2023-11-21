import React, { useState, useEffect } from "react";
import IceAndFireApi from "../../services/IceAndFireApi";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Houses = () => {
    const [houses, setHouses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalHouses, setTotalHouses] = useState(0);
    const [error, setError] = useState(null);

    const totalPages = Math.ceil(totalHouses / pageSize);

    useEffect(() => {
        const fetchHouses = async () => {
            try {
                const response = await IceAndFireApi.getHousesWithPagination(currentPage, pageSize);
                console.log("API Response:", response);

                if (response.data.length === 0) {
                    console.log("No more houses to list.");
                } else {
                    setHouses(response.data);
                    setTotalHouses(response.total);
                }
            } catch (err) {
                setError("Error fetching houses. Please try again later.");
            }
        };

        fetchHouses();
        console.log("currentPage:", currentPage);
        console.log("totalPages:", totalPages);
    }, [currentPage, pageSize, setTotalHouses]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handlePageSizeChange = (newSize) => {
        setPageSize(newSize);
        setCurrentPage(1);
    };

    return (
        <Container>
            <h1 className="mt-5 mb-4">Houses of Westeros and Beyond</h1>
            {error && <p className="text-danger">{error}</p>}
            <Row>
                {houses.map((house) => (
                    <Col key={house.url} md={6} lg={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <Link to={`/houses/${house.url.split("/").pop()}`}>
                                        <strong>{house.name}</strong>
                                    </Link>
                                </Card.Title>
                                <Card.Text>
                                    <p>
                                        Titles: {house.titles.join(", ") || "No Titles"}
                                        <br />
                                        Current Lord:{" "}
                                        {house.currentLord ? (
                                            <Link to={`/character/${house.currentLord.split("/").pop()}`}>{house.currentLord.split("/").pop()}</Link>
                                        ) : (
                                            "N/A"
                                        )}
                                        <br />
                                        Sworn Members:{" "}
                                        {house.swornMembers &&
                                            house.swornMembers.map((member, index) => (
                                                <span key={index}>
                                                    <Link to={`/character/${member.split("/").pop()}`}>{member.split("/").pop()}</Link>
                                                    {index < house.swornMembers.length - 1 && ", "}
                                                </span>
                                            ))}
                                    </p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            <select value={pageSize} onChange={(e) => handlePageSizeChange(parseInt(e.target.value, 10))}>
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
                <option value={50}>50 per page</option>
            </select>
        </Container>
    );
};

export default Houses;
