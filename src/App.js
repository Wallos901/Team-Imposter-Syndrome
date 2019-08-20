import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavbarComp from "./components/navbar.component";
import CardComp from "./components/card.component";

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <NavbarComp/>
      </div>
      <div className="container">
        <Route path="/" exact component={CardComp} />
      </div>
    </Router>
  );
}

export default App;
