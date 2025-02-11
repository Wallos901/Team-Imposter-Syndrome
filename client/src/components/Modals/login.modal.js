import React from "react";
import { ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, FormFeedback, Label, Input, Button, Alert } from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class ProfileModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            validate: {
                usernameState: null,
                passwordState: null,
                mainState: null
            },
            mainAlertVisible: false,
            toAdminPage: false,
            loading: false
        };
    }

    /** Updates state as fields are input. */
    handleInputChange = async (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    };

    /** Handles clicking on input fields. */
    handleClick = async (event) => {
        const { id } = event.target;
        const { validate } = this.state;
        validate[id] = null;
        this.setState({ validate });
    };

    onAlertDismiss() {
        this.setState({
            mainAlertVisible: false
        });
    };

    /* Handles logging in. */
    onSubmit(e) {
        this.setState({loading: true});
        e.preventDefault();
        // Attempts to login with user details entered with a post request.
        axios.post("/api/users/login", this.state)
            .then(res => {
                if(res.status === 200) {
                    localStorage.user = JSON.stringify(res.data);
                    if (res.data.is_admin) {
                        this.props.closeModal();
                        this.setState({ toAdminPage: true });
                        this.props.reloadPage();
                    }
                    else this.props.reloadPage();
                }
                // If login request failed, runs the validation on all fields and alerts user what went wrong. 
                else if(res.status === 202) {
                    console.log(res);
                    const { validate } = this.state;
                    const { username, password, main } = res.data;
                    if(username) validate.usernameState = username;
                    if(password) validate.passwordState = password;
                    if(main) {
                        validate.mainState = main;
                        this.setState({ mainAlertVisible: true });
                    }
                    this.setState({ validate });
                }
            })
            .catch(err => {
                console.log(err);
            });
        this.setState({loading: false});
    };

    render() {
        const { username, password, validate, mainAlertVisible, toAdminPage } = this.state;
        let modalHeading = "";
        if (this.props.heading) modalHeading = this.props.heading;
        if (toAdminPage) {
            return <Redirect to="/admin" />
        }
        return (
            <div>
                <ModalHeader toggle={this.props.closeModal}>{"Log In" + modalHeading}</ModalHeader>
                <Form className="form" onSubmit={ (e) => this.onSubmit(e) }>
                <ModalBody>
                    <Alert color="danger" isOpen={ mainAlertVisible } toggle={ () => this.onAlertDismiss() }>
                        { validate.mainState }
                    </Alert>
                    <Col>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input
                                type="username"
                                name="username"
                                id="usernameState"
                                placeholder="Enter username..."
                                value={ username }
                                invalid={ !!validate.usernameState }
                                onChange={ (e) => this.handleInputChange(e) }
                                onClick={ (e) => this.handleClick(e) }
                            />
                            <FormFeedback>
                                { validate.usernameState }
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
                                onClick={ (e) => this.handleClick(e) }
                            />
                            <FormFeedback>
                                { validate.passwordState }
                            </FormFeedback>
                        </FormGroup>
                    </Col>
                </ModalBody>
                <ModalFooter style={{display: "flex", justifyContent: "space-between"}}>
                    <div>
                        <span>Don't have an account? </span>
                        <span
                            className={"redirectLink"}
                            onClick={this.props.toggle}>
                            Register
                        </span>
                    </div>
                    <div>
                        <Button style={{marginRight: "7px"}} disabled={this.state.loading} color="primary">Login</Button>
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
