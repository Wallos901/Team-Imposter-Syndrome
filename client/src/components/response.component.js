import React from 'react';
import Reactions from "./reactions.component";
import { getAll } from "../utilities/download.util";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, ButtonGroup, Alert, Form, FormGroup, Input, FormText} from 'reactstrap';
import axios from "axios";

import uploadFile from "../utilities/upload.util";
import deleteFile from "../utilities/delete.util";
import Responses from "./responses.component";
import LoadingComp from './loading.component';

/** Response Component
 * 
 * Formats a reply to an image, displaying the responses component for it 
 * and shows responses to that image if there are any. 
 */
export default class Response extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedReplies: false,
            loadingReplies: false,
            newReply: false,
            replies: [],
            update: true,
            userLogged: localStorage.user ? JSON.parse(localStorage.user) : null,
            reportDisabled: false,
            error: "",
            errorVisible: false,
            editModalVisable: false,
            loading: false,
        };
    }

    async componentDidMount() {
        // Check if there is at least 1 reply.
        this.setState({
            loadingReplies: true,
        });
        this.setState({
            replies: await getAll(`posts/replies/${this.props.postId}?limit=1`),
        });
        this.setState({
            loadingReplies: false,
        });

        const { userLogged } = this.state;
        if (userLogged) {
            axios.get("/api/posts/hasUserReportedPost/" + userLogged._id + "/" + this.props.postId)
                .then(res => {
                    this.setState({ reportDisabled: res.data });
                }).catch(err => console.log(err));
        }
    }

    reloadResponses = () => {
        this.setState({
            update: !this.state.update,
        });
        if(!this.state.loadedReplies){
            this.setState({
                loadedReplies: true,
            });
        }
    };

    loadReplies() {
        if(this.state.replies.length > 0){
            // If there are replies, load them.
            this.setState({
                loadedReplies: true,
            });
        }
    }

    onErrorDismiss() {
        this.setState({
            errorVisible: false
        });
    };

    editPost() {
        if (document.getElementById("editfileUpload").value !== "") {
            console.log(this.props.postId);
            if (deleteFile(this.props.postId)) {
                if (uploadFile(document.getElementById("editfileUpload").files[0], this.props.parentId)) {
                    window.location.reload();
                }
            }
        }
    }

    editPostCheck() {
        this.setState({loading: true});
        axios.post("/api/posts/editCheck/" + this.props.postId)
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
        this.setState({loading: false});
    }

    toggleEditModal() {
        this.setState(prevState => ({
            editModalVisable: !prevState.editModalVisable
        }));
    }

    deletePost() {
        axios.delete("/api/posts/" + this.props.postId)
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

    reportPost() {
        const { userLogged } = this.state;
        axios.post("/api/posts/reportPost", { postID: this.props.postId, userID: userLogged ? userLogged._id : "73" })
            .then(() => {
                this.setState({ reportDisabled: true });
            })
            .catch(err => console.log(err));
    }

    render() {
        const { userLogged, errorVisible, error, editModalVisable, reportDisabled } = this.state;
        return (
            <li key={this.props.postId}>
                <div style={{ position: "relative" }}>
                    <Modal isOpen={ editModalVisable } toggle={ this.toggleEditModal } centered>
                        <ModalHeader>Upload Replacement Image</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Input id="editfileUpload" type="file" accept=".jpg, .png, .gif"/>
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
                    <Alert color="danger" isOpen={ errorVisible } toggle={ () => this.onErrorDismiss() }>
                        { error }
                    </Alert>
                    { userLogged && userLogged._id === this.props.userId && !this.props.postDeleted && !userLogged.is_admin &&
                        <ButtonGroup style={{ position: "absolute", zIndex: "100", right: "0", padding: "10px" }}>
                            <Button disabled={this.state.loading} onClick={() => this.editPostCheck()}>Edit</Button>
                            <Button disabled={this.state.loading} onClick={() => this.deletePost()}>Delete</Button>
                        </ButtonGroup>
                    }
                    { ((userLogged && userLogged._id !== this.props.userId && !userLogged.is_admin) || !userLogged) && !this.props.postDeleted &&
                        <Button style={{ position: "absolute", zIndex: "100", right: "0", padding: "10px" }} color={"danger"} onClick={() => this.reportPost()} disabled={reportDisabled}>&#x26a0; Report</Button>
                    }
                    { userLogged && userLogged.is_admin &&
                        <Button style={{ position: "absolute", zIndex: "100", right: "0", padding: "10px" }} color={"danger"} onClick={() => this.deletePost()}>Delete</Button>
                    }
                    <img className={"comment-post"}
                        alt=""
                        src={this.props.imageURL}
                        style={{maxWidth: "30%"}}
                    />
                </div>
                {(this.props.layer >= this.props.maxLayers && !this.state.loadedReplies && this.state.replies.length>0) && 
                    <Button style={{width:"30%", float: "right"}} color="secondary" onClick={() => this.loadReplies()}>See replies</Button>
                } {this.state.loadingReplies && 
                    <div style={{width:"30%", float: "right"}}>
                        <LoadingComp/>
                    </div>
                }
                <Reactions reRenderParent={this.reloadResponses} userId={this.props.userId} postId={this.props.postId} layer={this.props.layer}/>
                {(this.props.layer < this.props.maxLayers || this.state.loadedReplies) &&
                    <Responses
                    postId={this.props.postId} 
                    userId={this.props.userId} 
                    update={this.state.update}
                    loadComments={this.reloadResponses}
                    layer={this.props.layer+1} 
                    maxLayers={this.props.maxLayers}/>
                }
                <hr/>
            </li>
        )
    }
} 