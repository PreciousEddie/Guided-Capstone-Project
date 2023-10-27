import React from "react";
import { BrowserRouter } from "react-router-dom";
import styles from "./App.module.css";
import NavBar from "./components/NavBar/NavBar";
import AppRoute from "./routes/AppRoute";

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
