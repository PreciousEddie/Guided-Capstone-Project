import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./styles.css";
import NavBar from "./components/NavBar/NavBar";
import AppRoute from "./routes/AppRoute";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      {
        <BrowserRouter>
          <div>
            <header>
              <NavBar />
            </header>
            <main>
              <AppRoute />
            </main>
          </div>
        </BrowserRouter>
      }
    </>
  );
}

export default App;
