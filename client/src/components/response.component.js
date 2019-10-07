import React from 'react';
import Reactions from "./reactions.component";
import { getAll } from "../utilities/download.util";
import { Button, ButtonGroup } from "reactstrap";
import axios from "axios";

import Responses from "./responses.component";
import LoadingComp from './loading.component';

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
            reportDisabled: false
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
            axios.get("http://localhost:5000/api/posts/hasUserReportedPost/" + userLogged._id + "/" + this.props.postId)
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

    render() {
        const { userLogged, reportDisabled } = this.state;
        return (
            <li key={this.props.postId}>
                <div style={{ position: "relative" }}>
                    { userLogged && userLogged._id === this.props.userId && !this.props.postDeleted && !userLogged.is_admin &&
                        <ButtonGroup style={{ position: "absolute", zIndex: "100", right: "0", padding: "10px" }}>
                            <Button onClick={() => this.editPostCheck()}>Edit</Button>
                            <Button onClick={() => this.deletePost()}>Delete</Button>
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
                {/* <img className={"comment-post"}
                        alt=""
                        src={this.props.imageURL}
                        style={{maxWidth: "30%"}}
                /> */}
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