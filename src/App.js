import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import NavbarComp from "./components/navbar.component";
import CardComp from "./components/card.component";

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <NavbarComp/>
      </div>
      <div className="container">
        <CardComp/>
      </div>
    </Router>
  );
}

export default App;
