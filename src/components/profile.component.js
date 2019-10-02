import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import '../styling.css' ;

import {Button, Table} from "reactstrap";
import FeedComp from "./feed.component";

export default class ProfileComp extends React.Component {
    render() {
        return (
            <Router>
                <div className="container">
                    {/*TODO: allow user to edit their details*/}
                    <h3 style={{paddingTop: "10px"}}>Your Details<Button style={{float: "right"}}>Edit</Button></h3>
                    <hr/>
                    <Table dark>
                        <tbody>
                        <tr>
                            <th width={"10px"} scope="row">Email</th>
                            <td>Email goes here</td>
                        </tr>
                        <tr>
                            <th scope="row">Username</th>
                            <td>Username goes here</td>
                        </tr>
                        <tr>
                            <th scope="row">Password</th>
                            <td>Password goes here</td>
                        </tr>
                        </tbody>
                    </Table>

                    <h3 style={{marginTop: "50px"}}>Your Posts</h3>
                    <hr/>
                    {/*TODO: filter by user*/}
                    <FeedComp/>
                </div>
            </Router>
        );
    }
}
