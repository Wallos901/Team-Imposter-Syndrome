import React from "react";
import { ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, FormFeedback, Label, Input, Button } from "reactstrap";
import axios from "axios";

export default class ProfileModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            password2: "",
            validate: {
                usernameState: null,
                usernameValid: "",
                emailState: null,
                passwordState: null,
                password2State: null
            },
            usernameChecked: false
        };
    };

    handleInputChange = async (event) => {
        const { value, name, id } = event.target;
        const { validate, username } = this.state;
        let { usernameChecked } = this.state;
        validate[id] = null;
        if (!usernameChecked && name !== "username" && username !== "") {
            this.checkUsername();
        }
        if (name === "username") {
            validate.usernameValid = "";
            usernameChecked = false;
        }
        this.setState({
            [name]: value,
            validate,
            usernameChecked
        });
    };

    checkUsername = async () => {
        const { validate, username } = this.state;
        axios.post("/api/users/findUserByName", { username: username })
            .then(res => {
                if (res.status === 200) {
                    validate.usernameValid = "has-success";
                    validate.usernameState = res.data.username;
                }
                else if (res.status === 202) {
                    validate.usernameValid = "has-danger";
                    validate.usernameState = res.data.username;
                }
                this.setState({ 
                    validate,
                    usernameChecked: true
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    onSubmit(e) {
        e.preventDefault();
        axios.post("/api/users/register", this.state)
            .then(res => {
                if (res.status === 200) {
                    localStorage.user = JSON.stringify(res.data);
                    this.props.reloadPage();
                }
                else if (res.status === 202) {
                    const { validate } = this.state;
                    const { username, email, password, password2 } = res.data;
                    if(username) validate.usernameState = username;
                    if(email) validate.emailState = email;
                    if(password) validate.passwordState = password;
                    if(password2) validate.password2State = password2;
                    this.setState({ validate });
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        const { username, email, password, password2, validate } = this.state;
        let modalHeading = "";
        if(this.props.heading) modalHeading = this.props.heading;
        return (
            <div>
                <ModalHeader toggle={this.props.closeModal}>{"Register" + modalHeading}</ModalHeader>
                <Form className="form" onSubmit={ (e) => this.onSubmit(e) }>
                <ModalBody>
                    <Col>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input
                                type="username"
                                name="username"
                                id="usernameState"
                                placeholder="Enter username..."
                                value={ username }
                                valid={ validate.usernameValid === 'has-success' }
                                invalid={ validate.usernameValid === 'has-danger' }
                                onChange={ (e) => this.handleInputChange(e) }
                            />
                            <FormFeedback valid>
                                { validate.usernameState }
                            </FormFeedback>
                            <FormFeedback>
                                { validate.usernameState }
                            </FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="emailState"
                                placeholder="Enter email..."
                                value={ email }
                                invalid={ !!validate.emailState }
                                onChange={ (e) => this.handleInputChange(e) }
                            />
                            <FormFeedback>
                                { validate.emailState }
                            </FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="passwordState"
                                placeholder="Enter password..."
                                value={ password }
                                invalid={ !!validate.passwordState }
                                onChange={ (e) => this.handleInputChange(e) }
                            />
                            <FormFeedback>
                                { validate.passwordState }
                            </FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="password2">Confirm Password</Label>
                            <Input
                                type="password"
                                name="password2"
                                id="password2State"
                                placeholder="Confirm password..."
                                value={ password2 }
                                invalid={ !!validate.password2State }
                                onChange={ (e) => this.handleInputChange(e) }
                            />
                            <FormFeedback>
                                { validate.password2State }
                            </FormFeedback>
                        </FormGroup>
                    </Col>
                </ModalBody>
                <ModalFooter style={{display: "flex", justifyContent: "space-between"}}>
                    <div>
                        <span>Already have an account? </span>
                        <span
                            className={"redirectLink"}
                            onClick={this.props.toggle}>
                            Login
                        </span>
                    </div>
                    <div>
                        <Button style={{marginRight: "7px"}} color="primary">Register</Button>
                        {this.props.closeModal &&
                            <Button color="secondary" onClick={this.props.closeModal}>Close</Button>
                        }
                    </div>
                </ModalFooter>
                </Form>
            </div>
        );
    }
}
