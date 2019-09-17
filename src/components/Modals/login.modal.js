import React from "react";
import { ModalHeader, ModalBody, Col, Form, FormGroup, FormFeedback, Label, Input, Button, Alert } from "reactstrap";
import axios from "axios";

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
            mainAlertVisible: false
        };
    }

    handleInputChange = async (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    };

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

    onSubmit(e) {
        e.preventDefault();
        axios.post("http://localhost:5000/api/users/login", this.state)
            .then(res => {
                if(res.status === 200) {
                    localStorage.user = JSON.stringify(res.data);
                    this.props.closeModal();
                }
                else if(res.status === 202) {
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
    };

    render() {
        const { username, password, validate, mainAlertVisible } = this.state;
        return (
            <div>
                <ModalHeader>Login Below!</ModalHeader>
                <ModalBody>
                    <Alert color="danger" isOpen={ mainAlertVisible } toggle={ () => this.onAlertDismiss() }>
                        { validate.mainState }
                    </Alert>
                    <Form className="form" onSubmit={ (e) => this.onSubmit(e) }>
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
                        <Button>Login</Button>
                    </Form>
                </ModalBody>
            </div>
        );
    }
}
