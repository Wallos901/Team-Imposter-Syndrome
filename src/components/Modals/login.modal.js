import React from "react";
import { ModalHeader, ModalBody, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";
import ModalFooter from "reactstrap/es/ModalFooter";

export default class ProfileModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
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
        axios.post("http://localhost:5000/api/users/login", this.state)
            .then(res => {
                if(res.status === 200) {
                    localStorage.user = JSON.stringify(res.data);
                    this.props.reloadPage();
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        const { username, password } = this.state;
        return (
            <div>
                <ModalHeader>Login Below!</ModalHeader>
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
                        <Button style={{marginRight: "7px"}} color="primary">Login</Button>
                        <Button color="secondary" onClick={this.props.closeModal}>Close</Button>
                    </div>
                </ModalFooter>
                </Form>
            </div>
        );
    }
}
