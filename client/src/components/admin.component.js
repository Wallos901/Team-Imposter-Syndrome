import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import '../styling.css' ;

import {Button, Table} from "reactstrap";
import axios from 'axios';
import Masonry from 'react-masonry-css';

import CardComp from "./card.component";

const dynamicColumnBreakpoints = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
};

export default class AdminComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sockPuppets: [],
            postGrid: []
        }
    }

    /* Get and display the required admin components - a list of
    * potential sock puppet users and a list of reported posts */
    componentDidMount() {
        axios.get("/api/users/findSockPuppets")
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

        axios.get("/api/posts/reportedPosts")
            .then(res => {
                res.data.forEach(post => {
                    this.setState(prevState => ({
                        postGrid: [...prevState.postGrid,
                            <CardComp imageUrl={post.imageURL} userId={post.userID} postId={post._id} key={post._id} postDeleted={post.deleted} createdAt={post.createdAt}/>
                        ]
                    }));
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        const { sockPuppets, postGrid } = this.state;
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
                    <Masonry
                        breakpointCols={dynamicColumnBreakpoints}
                        className="post-grid"
                        columnClassName="post-container"
                    >
                        {postGrid}
                    </Masonry>
                </div>
            </Router>
        );
    }
}
