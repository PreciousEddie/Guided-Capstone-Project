import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function NavBar() {
    const routes = [
        { to: "/", text: "Home" },
        { to: "/characters", text: "Characters" },
        { to: "/houses", text: "Houses" },
    ];

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    { routes.map((route, index) => (
                        <NavLink
                            key={ index }
                            className="nav-link"
                            activeClassName="active"
                            to={ route.to }
                        >
                            { route.text }
                        </NavLink>
                    )) }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;
