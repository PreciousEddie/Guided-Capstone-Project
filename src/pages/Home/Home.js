import React from "react";
import { Container, Row, Col } from "reactstrap";

function Home() {
    return (
        <Container>
            <Row>
                <Col>
                    <h1 className="display-3">The World of Westeros</h1>
                    <p className="lead">Welcome to the fascinating world of Westeros.</p>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
