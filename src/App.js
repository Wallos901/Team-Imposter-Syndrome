import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import NavbarComp from "./components/navbar.component";
import FeedComp from "./components/feed.component";

function App() {
  return (
    <Router>
      <div>
        <NavbarComp/>
      </div>
      <div className="container">
        <FeedComp/>
      </div>
    </Router>
  );
}

export default App;
