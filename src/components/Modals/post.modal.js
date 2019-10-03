import React from 'react';
import {ModalBody, Button, ButtonGroup, Alert} from 'reactstrap';
import Comments from "../responses.component";
import Reactions from "../reactions.component";
import axios from 'axios';

export default class PostModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userLogged: localStorage.user ? JSON.parse(localStorage.user) : null,
            error: "",
            errorVisible: false,
            uploadModalVisable: false
        };
    }

    editPost() {
        axios.post("http://localhost:5000/api/posts/edit/" + this.props.postId)
            .then(res => {
                if (res.status === 200) {
                    console.log("yey");
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

    render() {
        const { userLogged, errorVisible, error } = this.state;
        return (
            <div>
                <ModalBody className={"modal-body"}>
                    <Alert color="danger" isOpen={ errorVisible } toggle={ () => this.onErrorDismiss() }>
                        { error }
                    </Alert>
                    <div style={{ position: "relative" }}>
                        { userLogged && userLogged._id === this.props.userId && !this.props.postDeleted &&
                            <ButtonGroup style={{ position: "absolute", zIndex: "100", right: "0", padding: "10px" }}>
                                <Button onClick={() => this.editPost()}>Edit</Button>
                                <Button onClick={() => this.deletePost()}>Delete</Button>
                            </ButtonGroup>
                        }
                        <img src={this.props.imageUrl} alt={"some alt text"} width='100%'/>
                    </div>
                    <hr/>
                    <Reactions userId={this.props.userId} postId={this.props.postId}/>
                    <Comments/>
                </ModalBody>
            </div>
        );
    }
}