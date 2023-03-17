import React from 'react';
import './App.css';
import Home from './Feature/Home';
import {Routes, 
  Route, redirect,} from "react-router-dom";
import Repository from './Feature/Repository/Repository';

function App() {
  return (
    <>

      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/Repository/:owner/:name" Component={Repository} />
      </Routes>

    </>
  );
}

export default App;
