import React from 'react';

import '../styling.css' ;

import { Button, ButtonGroup, Col, Container, Row, Input, UncontrolledAlert } from "reactstrap";
import axios from 'axios';
import Masonry from 'react-masonry-css';

import CardComp from "./card.component";
import { getAll } from "../utilities/download.util";

const dynamicColumnBreakpoints = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
};

export default class ProfileComp extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            userLogged: localStorage.user ? JSON.parse(localStorage.user) : null,
            toggleEditUserInfoFlag: false,
            updateFormContent: {
                email: "",
                password: "",
                password2: ""
            },
            updateErrors: [],
            loadedPosts: [],
            postGrid: []
        };
    };

    /* load and display only the current user's posts */
    async componentDidMount() {
        const { userLogged } = this.state;
        this.setState({
            loadedPosts: await getAll("posts/byUser/" + userLogged._id)
        });
        this.state.loadedPosts.forEach((post) => {
            this.setState(prevState => ({
                postGrid: [...prevState.postGrid,
                    <CardComp imageUrl={post.imageURL} userId={post.userID} postId={post._id} key={post._id} postDeleted={post.deleted} createdAt={post.createdAt}/>]
            }));

        });
    }

    toggleEditUserInfo() {
        this.setState(prevState => ({
            toggleEditUserInfoFlag: !prevState.toggleEditUserInfoFlag,
            updateFormContent: {
                email: "",
                password: "",
                password2: ""
            }
        }));
    };

    handleInputChange(event) {
        const { value, name } = event.target;
        const { updateFormContent } = this.state;
        updateFormContent[name] = value;
        this.setState({ updateFormContent });
    }

    saveUserInfo() {
        let { userLogged, updateFormContent, updateErrors } = this.state;
        axios.post("/api/users/update/" + userLogged._id, updateFormContent)
            .then(res => {
                if(res.status === 200) {
                    localStorage.user = JSON.stringify(res.data);
                    this.setState({
                        userLogged: localStorage.user ? JSON.parse(localStorage.user) : null,
                        toggleEditUserInfoFlag: false
                    });
                } else if (res.status === 202) {
                    updateErrors = [];
                    Object.values(res.data).forEach(error => {
                        const keyID = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
                        updateErrors.push(
                            <UncontrolledAlert key={ keyID } color="danger">{ error }</UncontrolledAlert>
                        )
                    });
                    this.setState({ updateErrors });
                }
            }).catch(err => console.log(err));
    }

    render() {
        const { userLogged, toggleEditUserInfoFlag, updateErrors, postGrid } = this.state;
        return (
            <div className="container">
                <h3 className="mt-2 mb-2">Your Details
                    { !toggleEditUserInfoFlag &&
                        <Button className="float-right" onClick={() => this.toggleEditUserInfo()}>Edit</Button>
                    }
                    { toggleEditUserInfoFlag &&
                        <ButtonGroup className="float-right">
                            <Button onClick={() => this.saveUserInfo()}>Save</Button>
                            <Button onClick={() => this.toggleEditUserInfo()}>Cancel</Button>
                        </ButtonGroup>
                    }
                </h3>
                <hr/>
                { updateErrors }
                <Container className="mb-4">
                    <Row>
                        <Col xs="6" sm="8">
                            <h5>Email:</h5>
                        </Col>
                        <Col xs="6" sm="4">
                            { !toggleEditUserInfoFlag &&
                                userLogged.email
                            }
                            { toggleEditUserInfoFlag &&
                                <Input type="text" name ="email" placeholder={ userLogged.email } onChange={(e) => this.handleInputChange(e)} />
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6" sm="8">
                            <h5>Password:</h5>
                        </Col>
                        <Col xs="6" sm="4">
                            { !toggleEditUserInfoFlag &&
                                "********"
                            }
                            { toggleEditUserInfoFlag &&
                                <Input type="password" name="password" placeholder="********" onChange={(e) => this.handleInputChange(e)} />
                            }
                        </Col>
                    </Row>
                    { toggleEditUserInfoFlag && 
                        <Row>
                            <Col xs="6" sm="8">
                                <h5>Confirm Password:</h5>
                            </Col>
                            <Col xs="6" sm="4">
                                { !toggleEditUserInfoFlag &&
                                    "********"
                                }
                                { toggleEditUserInfoFlag &&
                                    <Input type="password" name="password2" placeholder="********" onChange={(e) => this.handleInputChange(e)} />
                                }
                            </Col>
                        </Row>
                    }
                </Container>

                <h3>Your Posts</h3>
                <hr/>
                <Masonry
                    breakpointCols={dynamicColumnBreakpoints}
                    className="post-grid"
                    columnClassName="post-container"
                >
                    {postGrid}
                </Masonry>
            </div>
        );
    }
}
