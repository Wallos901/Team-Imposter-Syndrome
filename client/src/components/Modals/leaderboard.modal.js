import React from 'react';
import {Nav, NavItem, NavLink, TabContent, TabPane, ModalHeader, ModalBody, Table} from 'reactstrap';
import axios from "axios";

export default class LeaderboardModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reactionsTable: [],
            postsTable: [],
            activeTab: "1"
        };
    }

    componentDidMount() {
        this.populateLeaderboard();
    }

    populateLeaderboard() {
        let { reactionsTable, postsTable } = this.state;
        let reactionCounter = 1;
        axios.get("/api/users/findUsersByReactionCount")
            .then(res => {
                res.data.forEach(user => {
                    reactionsTable = [...reactionsTable, 
                        <tr key={ user._id }>
                            <th scope="row">{ reactionCounter }</th>
                            <td>{ user.username }</td>
                            <td>{ user.reaction_count }</td>
                        </tr>];
                    reactionCounter++;
                });
                this.setState({ reactionsTable });
            });

        let postCounter = 1;
        axios.get("/api/users/findUsersByPostCount")
        .then(res => {
            res.data.forEach(user => {
                postsTable = [...postsTable, 
                    <tr key={ user._id }>
                        <th scope="row">{ postCounter }</th>
                        <td>{ user.username }</td>
                        <td>{ user.post_count }</td>
                    </tr>];
                postCounter++;
            });
            this.setState({ postsTable });
        });    
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab });
        }
    }

    render() {
        const { reactionsTable, postsTable } = this.state;
        return (
            <div>
                <ModalHeader toggle={this.props.closeModal}>Leaderboard</ModalHeader>
                <ModalBody>
                    <Nav tabs>
                        <NavItem style={{ cursor: "pointer" }}>
                            <NavLink
                                onClick={() => this.toggleTab("1")}
                            >
                                Total Reactions
                            </NavLink>
                        </NavItem>
                        <NavItem style={{ cursor: "pointer" }}>
                            <NavLink
                                onClick={() => this.toggleTab("2")}
                            >
                                Total Posts
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={ this.state.activeTab }>
                        <TabPane tabId="1">
                            <Table striped={true} borderless={true} hover={true}>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Username</th>
                                        <th>Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { reactionsTable }
                                </tbody>
                            </Table>
                        </TabPane>
                        <TabPane tabId="2">
                            <Table striped={true} borderless={true} hover={true}>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Username</th>
                                        <th>Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { postsTable }
                                </tbody>
                            </Table>
                        </TabPane>
                    </TabContent>
                </ModalBody>
            </div>
        );
    }
}