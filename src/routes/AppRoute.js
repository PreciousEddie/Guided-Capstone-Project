import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home/Home";
import Characters from "../pages/Characters/Characters";
import Character from "../pages/Character/Character";
import Houses from "../pages/Houses/Houses";

function AppRoute() {
    return (
        <Routes>
            <Route
                path="/"
                element={ <Home /> }
            />
            <Route
                path="/characters"
                element={ <Characters /> }
            />
            <Route
                path="/character/:characterId"
                element={ <Character /> }
            />
            <Route
                path="/houses"
                element={ <Houses /> }
            />
            <Route
                path="*"
                element={ <Navigate to={ "/" } /> }
            />
        </Routes>
    );
}

export default AppRoute;