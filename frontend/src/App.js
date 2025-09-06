/*
import './App.css';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <h1>Welcome</h1>
     <Home></Home>
    </div>
  );
}

export default App;
*/

import React from "react";
import HelloService from "./components/HelloService";
import ProfileService from "./components/ProfileService";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Sample MERN Microservices Frontend</h1>
      <HelloService />
      <hr />
      <ProfileService />
    </div>
  );
}

export default App;

