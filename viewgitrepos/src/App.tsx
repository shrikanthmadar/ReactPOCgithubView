import React from "react";
import "./App.css";
import Home from "./Feature/Home";
import { Routes, Route, redirect } from "react-router-dom";
import Repository from "./Feature/Repository/Repository";
import Repositories from "./Feature/Repositories/Repositories";
import { ProgressBar, RotatingLines } from "react-loader-spinner";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Home}>
          <Route path="/Repository/:owner/:name" Component={Repository} />
          <Route path="/" Component={Repositories} />
          <Route path="/Repositories" Component={Repositories} />
          <Route
            path="*"
            element={
              <div>
                {" "}
                <h1> Oop's page not found</h1>
              </div>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
