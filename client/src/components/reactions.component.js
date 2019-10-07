/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import {Button, ButtonGroup, Form, FormGroup, FormText, Input} from "reactstrap";
import axios from "axios";
import upload from "../utilities/upload.util";

export default class Reactions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            reactionState: {
                like: false,
                dislike: false,
                love: false,
                laugh: false,
                fire: false
            },
            reactionStateOnClose: {
                like: false,
                dislike: false,
                love: false,
                laugh: false,
                fire: false
            },
            deselectedReact: null,
            selectedReact: null,
            currentReact: null,
            reactions: {
                like: 0,
                dislike: 0,
                love: 0,
                laugh: 0,
                fire: 0
            },
            userLogged: localStorage.user ? JSON.parse(localStorage.user) : null
        };
    }

    componentDidMount() {
        if (localStorage.user) {
            const { reactionState, reactionStateOnClose } = this.state;
            const user = JSON.parse(localStorage.user);
            if (this.props.postId in user.post_reactions) {
                reactionState[user.post_reactions[this.props.postId]] = true;
                reactionStateOnClose[user.post_reactions[this.props.postId]] = true;
            }
            this.setState({reactionState, reactionStateOnClose});
        }
        this.getPostReactions();
    }

    componentWillUnmount() {
        console.log("UNMOUNTING");
        let { reactionStateOnClose, reactionState, userLogged } = this.state;
        let deselected = null; let selected = null; let currentReact = null;

        console.log(reactionState);
        console.log(reactionStateOnClose);

        Object.keys(reactionStateOnClose).forEach(reaction => {
            console.log("reactionState: ", reactionState[reaction]);
            console.log("reactionStateOnClose: ", reactionStateOnClose[reaction]);
            // If the initial reaction was true, and it is now false
            // This was a deselected reaction
            if (reactionState[reaction] && !reactionStateOnClose[reaction]) {
                deselected = reaction;
            } 
            // If the initial reaction was false, and it is now true
            // This was a selected reaction and is the current reaction
            else if (!reactionState[reaction] && reactionStateOnClose[reaction]) {
                selected = reaction;
                currentReact = reaction;
                // If user post reactions doesn't exist for this post and user yet
                if (!userLogged.post_reactions) {
                    console.log("I dont exist yet");
                } else {
                    userLogged.post_reactions[this.props.postId] = reaction;
                }
            } 
            // If the initial reaction was true, and it is now true (nothing changed)
            // This is the current reaction
            else if ( reactionState[reaction] && reactionStateOnClose[reaction]) {
                currentReact = reaction;
                userLogged.post_reactions[this.props.postId] = reaction;
            }
            // Otherwise, the reaction did not change
            console.log(userLogged.post_reactions);
        });

        console.log("deselected: " + deselected);
        console.log("selected: " + selected);
        console.log("current: " + currentReact);
        
        if (!(deselected === null && selected === null)){
            // Update user reactions 
            axios.post("http://localhost:5000/api/users/updateReaction", {
                reaction: currentReact,
                username: JSON.parse(localStorage.user).username,
                postID: this.props.postId
            })
                .catch(err => console.log(err));

            // Update post reactions
            axios.post("http://localhost:5000/api/posts/updateReaction", {
                postID: this.props.postId,
                deselectedReact: deselected,
                selectedReact: selected
            })
                .catch(err => console.log(err));
        }
    }

    handleReplyUpload = () => {
        if (document.getElementById("fileUpload"+this.props.postId).value !== "") {
            if (upload(document.getElementById("fileUpload"+this.props.postId).files[0], this.props.postId, null, this.props.reRenderParent)){
                document.getElementById("fileUpload"+this.props.postId).value = "";
            } else {
                alert('Error uploading image.');
            }
        } else {
            alert('Please select an image/gif to upload.');
        }
    };

    toggleReact(event) {
        let { id } = event.target;
        let { reactionStateOnClose, reactions, deselectedReact, selectedReact, currentReact } = this.state;
        let nullFlag = false; 

        console.log(reactionStateOnClose);

        Object.keys(reactionStateOnClose).forEach(reaction => {
            if (reactionStateOnClose[reaction]) {
                deselectedReact = reaction;
            }
            if (reaction === id) {
                selectedReact = reaction;
            }

            if (reaction === id && reactionStateOnClose[reaction]) {
                reactionStateOnClose[reaction] = false;
                nullFlag = true;
            } else {
                reactionStateOnClose[reaction] = reaction === id;
            }
            currentReact = nullFlag ? null : id;
        });

        // Instant reaction logic
        if (deselectedReact === selectedReact) reactions[selectedReact] -= 1;
        // If no reactions were deselcted, but one was selected
        else if (!deselectedReact) reactions[selectedReact] += 1;
        // If different reactions were deselected and selected
        else {
            reactions[deselectedReact] -= 1;
            reactions[selectedReact] += 1;
        }

        console.log("deselected: " + deselectedReact);
        console.log("selected: " + selectedReact);
        console.log("current: " + currentReact);

        this.setState({ reactionStateOnClose, reactions, selectedReact, deselectedReact, currentReact });
    }

    getPostReactions() {
        let {reactions} = this.state;
        axios.post("/api/posts/getReactions", {postID: this.props.postId})
            .then(res => {
                reactions.like = res.data.like;
                reactions.dislike = res.data.dislike;
                reactions.love = res.data.love;
                reactions.laugh = res.data.laugh;
                reactions.fire = res.data.fire;
                this.setState({reactions});
            })
            .catch(err => console.log(err));
    }

    render() {
        const {reactionStateOnClose, reactions, userLogged} = this.state;
        let replyButtonStyle = {float: "right"};
        return (
            <div>
                <ButtonGroup className="reactions-group">
                    <Button id="like" outline={!reactionStateOnClose.like} disabled={!userLogged}
                            onClick={(e) => this.toggleReact(e)}>&#x1F44D; {reactions.like}</Button>
                    <Button id="dislike" outline={!reactionStateOnClose.dislike} disabled={!userLogged}
                            onClick={(e) => this.toggleReact(e)}>&#x1F44E; {reactions.dislike}</Button>
                    <Button id="love" outline={!reactionStateOnClose.love} disabled={!userLogged}
                            onClick={(e) => this.toggleReact(e)}>&#x2764; {reactions.love}</Button>
                    <Button id="laugh" outline={!reactionStateOnClose.laugh} disabled={!userLogged}
                            onClick={(e) => this.toggleReact(e)}>&#x1F602; {reactions.laugh}</Button>
                    <Button id="fire" outline={!reactionStateOnClose.fire} disabled={!userLogged}
                            onClick={(e) => this.toggleReact(e)}>&#x1F525; {reactions.fire}</Button>
                </ButtonGroup>
                {userLogged && (this.props.layer < 5) &&
                    <div style={replyButtonStyle}>
                        <Form>
                            <FormGroup style={{display: "inline-block"}}>
                                <h5>Reply</h5>
                                <div style={{float: "right"}}>
                                    <FormText color="muted">
                                        Please select a file of type jpg, png, or gif to reply.
                                    </FormText>
                                    <Input id={"fileUpload"+this.props.postId} type="file" accept=".jpg, .png, .gif" onChange={this.handleReplyUpload}/>
                                </div>
                            </FormGroup>
                        </Form>
                    </div>
                }
                <div style={{padding: "10px"}}/>
            </div>
        );
    }
}