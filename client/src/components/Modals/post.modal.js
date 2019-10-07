import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, ButtonGroup, Alert, Form, FormGroup, Input, FormText} from 'reactstrap';
import Responses from "../responses.component";
import Reactions from "../reactions.component";
import SignInModal from "./signin.modal";
import axios from 'axios';
import uploadFile from "../../utilities/upload.util";
import deleteFile from "../../utilities/delete.util";
import '../../styling.css'

export default class PostModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userLogged: localStorage.user ? JSON.parse(localStorage.user) : null,
            error: "",
            errorVisible: false,
            editModalVisable: false,
            imageMaxHeight: this.setMaxHeight(),
            update: true,
        };
    }

    setMaxHeight() {
        return window.innerHeight * 0.7;
    }

    reloadResponses = () => {
        this.setState({
            update: !this.state.update,
        });
    };

    toggleEditModal() {
        this.setState(prevState => ({
            editModalVisable: !prevState.editModalVisable
        }));
    }

    editPostCheck() {
        axios.post("http://localhost:5000/api/posts/editCheck/" + this.props.postId)
            .then(res => {
                if (res.status === 200) {
                    this.toggleEditModal();
                }
                else if (res.status === 202) {
                    this.setState({
                        error: res.data.error,
                        errorVisible: true
                    });
                }
            })  
            .catch(err => console.log(err));
    }

    editPost() {
        if (document.getElementById("fileUpload").value !== "") {
            if (deleteFile(this.props.postId)) {
                if (uploadFile(document.getElementById("fileUpload").files[0])) {
                    window.location.reload();
                }
            }
        }
    }

    deletePost() {
        axios.delete("http://localhost:5000/api/posts/" + this.props.postId)
            .then(res => {
                if (res.status === 200) {
                    window.location.reload();
                }
                else if (res.status === 202) {
                    this.setState({
                        error: res.data.error,
                        errorVisible: true
                    });
                }
            })
            .catch(err => console.log(err));
    }

    onErrorDismiss() {
        this.setState({
            errorVisible: false
        });
    };

    render = () => {
        const { userLogged, errorVisible, error, editModalVisable } = this.state;
        return (
            <div>
                <div>
                    <Modal isOpen={ editModalVisable } toggle={ this.toggleEditModal } centered>
                        <ModalHeader>Upload Replacement Image</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Input id="fileUpload" type="file" accept=".jpg, .png, .gif"/>
                                    <FormText color="muted">
                                        Please select a file of type jpg, png, or gif.
                                    </FormText>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => this.editPost()}>Continue</Button>
                            <Button color="secondary" onClick={() => this.toggleEditModal()}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <ModalBody className={"modal-body"}>
                    <Alert color="danger" isOpen={ errorVisible } toggle={ () => this.onErrorDismiss() }>
                        { error }
                    </Alert>
                    <div style={{ position: "relative" }}>
                        { userLogged && userLogged._id === this.props.userId && !this.props.postDeleted &&
                            <ButtonGroup style={{ position: "absolute", zIndex: "100", right: "0", padding: "10px" }}>
                                <Button onClick={() => this.editPostCheck()}>Edit</Button>
                                <Button onClick={() => this.deletePost()}>Delete</Button>
                            </ButtonGroup>
                        }
                        <img style={{maxHeight: this.state.imageMaxHeight, maxWidth: "100%", marginLeft: "auto", marginRight: "auto", display:"block"}} src={this.props.imageUrl}
                             alt={"some alt text"}/>
                    </div>
                    { userLogged && !userLogged.is_admin &&
                        <div>
                            <hr/>
                            <div>
                                <Reactions reRenderParent={this.reloadResponses} update={this.state.update}
                                        userId={this.props.userId} postId={this.props.postId}/>
                            </div>
                        </div>
                    }
                    { !userLogged &&
                        <div>
                            <SignInModal type={"login"} heading=" to Respond" closeModal={null}/>
                        </div>
                    }
                    { !(userLogged && userLogged.is_admin) &&
                        <Responses update={this.state.update} userId={this.props.userId} postId={this.props.postId}/>
                    }
                    <Responses update={this.state.update} userId={this.props.userId} postId={this.props.postId} layer={1} maxLayers={1}/>
                </ModalBody>
            </div>
        );
    }
}