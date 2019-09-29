import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import '../styling.css' ;

import NavbarComp from "./navbar.component";

export default class ProfileComp extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <NavbarComp/>
                </div>
                <div className="container">
                    <p>test text</p>
                </div>
            </Router>
        );
    }
}
