import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import '../styling.css' ;

import NavbarComp from "./navbar.component";
import {Button, ListGroup, ListGroupItem} from "reactstrap";
import Masonry from "react-masonry-css";
import FeedComp from "./feed.component";

export default class ProfileComp extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <NavbarComp/>
                </div>
                <div className="container">
                    <h1>Your Details</h1>
                    <hr/>
                    <ListGroup>
                        <ListGroupItem>Email goes here</ListGroupItem>
                        <ListGroupItem>Username goes here</ListGroupItem>
                        <ListGroupItem>Password goes here</ListGroupItem>
                    </ListGroup>
                    <Button color={"secondary"}>Edit Details</Button>

                    <h1>Your Posts</h1>
                    <hr/>
                    /*need to filter by user*/
                    <FeedComp/>
                </div>
            </Router>
        );
    }
}
