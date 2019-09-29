import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import '../styling.css' ;

import NavbarComp from "./navbar.component";
import {ListGroup, ListGroupItem} from "reactstrap";
import Masonry from "react-masonry-css";

export default class ProfileComp extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <NavbarComp/>
                </div>
                <div className="container">
                    <ListGroup>
                        <ListGroupItem>Email goes here</ListGroupItem>
                        <ListGroupItem>Username goes here</ListGroupItem>
                        <ListGroupItem>Password goes here</ListGroupItem>
                    </ListGroup>

                    <Masonry
                        // breakpointCols={dynamicColunmBreakpoints}
                        className="post-grid"
                        columnClassName="post-container"
                    >
                        {this.state.postGrid}
                    </Masonry>
                </div>
            </Router>
        );
    }
}
