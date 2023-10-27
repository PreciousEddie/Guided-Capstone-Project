import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.css";

function NavBar() {
    const routes = [
        { to: "/", text: "Home" },
        { to: "/characters", text: "Characters of Westeros and Beyond" },
        { to: "/houses", text: "Houses of Westeros and Beyond" },
    ];
    return (
        <nav className={ styles["navigation"] }>
            { routes.map((route, index) => (
                <NavLink
                    key={ index }
                    className={ ({ isActive, isPending }) => `${styles["navigation__item"]} ${isActive ? styles["navigation__item--active"] : ""}` }
                    to={ route.to }
                >
                    { route.text }
                </NavLink>
            )) }
        </nav>
    );
};

export default NavBar;