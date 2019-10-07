import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import '../styling.css' ;

import {Button, Input, InputGroup} from "reactstrap";

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
                <div className="container">
                    <h1>Administration</h1>
                    <hr/>
                    <h3>Search Posts</h3>
                    <InputGroup>
                        <Input/>
                        <Button color={"primary"} onClick={"toggleResults"}>Search</Button>
                    </InputGroup>
                    <hr/>

                    <h3 style={{paddingTop: "10px"}}>Results</h3>
                    <hr/>
                </div>
            </Router>
        );
    }
}
