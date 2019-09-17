import React from "react";
import {ModalHeader, ModalBody, Col, Form, FormGroup, Label, Input, Button, ModalFooter} from "reactstrap";
import axios from "axios";

export default class ProfileModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            password2: ""
        };
    }

    handleInputChange = async (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    };

    onSubmit(e) {
        e.preventDefault();
        axios.post("http://localhost:5000/api/users/register", this.state)
            .then(res => {
                if(res.status === 200) {
                    this.props.closeModal();
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        const { username, email, password, password2 } = this.state;
        return (
            <div>
                <ModalHeader>Register Below!</ModalHeader>
                <Form className="form" onSubmit={ (e) => this.onSubmit(e) }>
                <ModalBody>
                    <Col>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input
                                type="username"
                                name="username"
                                id="username"
                                placeholder="Enter username..."
                                value={ username }
                                onChange={ (e) => this.handleInputChange(e) }
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter email..."
                                value={ email }
                                onChange={ (e) => this.handleInputChange(e) }
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter password..."
                                value={ password }
                                onChange={ (e) => this.handleInputChange(e) }
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="password2">Confirm Password</Label>
                            <Input
                                type="password"
                                name="password2"
                                id="password2"
                                placeholder="Confirm password..."
                                value={ password2 }
                                onChange={ (e) => this.handleInputChange(e) }
                                required
                            />
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
                        <Button color="secondary" onClick={this.props.closeModal}>Close</Button>
                    </div>
                </ModalFooter>
                </Form>
            </div>
        );
    }
}
