import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

import NavbarComp from "./components/navbar.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar/>
      </div>
    </Router>
  );
}

export default App;
