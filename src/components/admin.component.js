import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import '../styling.css' ;

import NavbarComp from "./navbar.component";
import {Button, Input, InputGroup, InputGroupAddon} from "reactstrap";

export default class AdminComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resultsVisible: false
        }
    }

    toggleResults() {

    }

    render() {
        return (
            <Router>
                <div>
                    <NavbarComp/>
                </div>
                <div className="container">
                    <h1>Search</h1>
                    <InputGroup>
                        <InputGroupAddon addonType={"prepend"}>Search</InputGroupAddon>
                        <Input/>
                        <Button color={"primary"} onClick={"toggleResults"}>Search</Button>
                    </InputGroup>

                    <h1>Results</h1>
                    <hr/>
                </div>
            </Router>
        );
    }
}
