import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import '../styling.css' ;

import {Button, Table} from "reactstrap";
import axios from 'axios';

export default class AdminComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sockPuppets: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:5000/api/users/findSockPuppets")
            .then(res => {
                res.data.forEach(userList => {
                    userList.userList.forEach(user => {
                        this.setState(prevState => ({
                            sockPuppets: [...prevState.sockPuppets, 
                                <tr key={user.username}>
                                    <td width="20%">{userList.last_IP}</td>
                                    <td width="30%">{user.username}</td>
                                    <td width="30%">{user.email}</td>
                                    <td width="20%"><Button>I'm a Button</Button></td>
                                </tr>   
                            ]
                        }));
                    });
                    this.setState(prevState => ({
                        sockPuppets: [...prevState.sockPuppets,
                            <tr key={userList.last_IP}>
                                <td width="20%"></td>
                                <td width="30%"></td>
                                <td width="30%"></td>
                                <td width="20%"></td>
                            </tr>
                        ]
                    }));
                });;
            })
            .catch(err => console.log(err));
    }

    render() {
        const { sockPuppets } = this.state;
        return (
            <Router>
                <div className="container">
                    <h1 className="mt-2">Administration</h1>
                    <hr/>
                    <h3 className="mt-2 mb-2">Potential Sock Puppet Users</h3>
                    <hr/>
                    <div className="mb-4" width="100%">
                        <Table size="xl">
                            <thead>
                                <tr style={{ display: "block" }}>
                                    <th width="20%">Shared IP Address</th>
                                    <th width="30%">Username</th>
                                    <th width="30%">Email Address</th>
                                    <th width="20%">Actions</th>
                                </tr>
                            </thead>
                            <tbody style={{ display: "block", overflow: "auto", height: "30%", width: "100%"}}>
                                { sockPuppets }
                            </tbody>
                        </Table>
                    </div>
                    <h3 className="mt-2 mb-2">Reported Posts</h3>
                    <hr/>
                </div>
            </Router>
        );
    }
}
