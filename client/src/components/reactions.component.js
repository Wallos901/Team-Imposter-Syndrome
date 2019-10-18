/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import {Button, ButtonGroup, Input } from "reactstrap";
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
            prevReact: null,
            currReact: null,
            storedReact: null,
            reactions: {
                like: 0,
                dislike: 0,
                love: 0,
                laugh: 0,
                fire: 0
            },
            userLogged: localStorage.user ? JSON.parse(localStorage.user) : null,
            loading: false
        };
    }

    /* check if user has already reacted to the current post
    and if yes then display their reaction as selected
     */
    componentDidMount() {
        this.setState({loading: true});
        let { reactionState, userLogged, storedReact } = this.state;
        if (userLogged) {
            if (this.props.postId in userLogged.post_reactions) {
                reactionState[userLogged.post_reactions[this.props.postId]] = true;
                storedReact = userLogged.post_reactions[this.props.postId];
            }
            this.setState({reactionState, storedReact});
        }
        this.getPostReactions();
    }

    /* set the new reaction selected by the user */
    componentWillUnmount() {
        let { prevReact, currReact, storedReact, userLogged } = this.state;
        if (!(prevReact === null && currReact === null)) {
            prevReact = storedReact;

            axios.post("/api/users/updateReaction", {
                reaction: currReact,
                username: userLogged.username,
                postID: this.props.postId
            })
            .then(res => localStorage.user = JSON.stringify(res.data))
            .catch(err => console.log(err));

            axios.post("/api/posts/updateReaction", { postID: this.props.postId, prevReact, currReact })
                .catch(err => console.log(err));
        }
    }

    handleReplyUpload = () => {
        if (document.getElementById("fileUpload" + this.props.postId).value !== "") {
            if (upload(document.getElementById("fileUpload" + this.props.postId).files[0], this.props.postId, null, this.props.reRenderParent)) {
                document.getElementById("fileUpload" + this.props.postId).value = "";
            } else {
                alert('Error uploading image.');
            }
        } else {
            alert('Please select an image/gif to upload.');
        }
    };

    toggleReact(event) {
        let { id } = event.target;
        let { reactionState, reactions, prevReact, currReact } = this.state;
        let prevSetFlag = false;

        Object.keys(reactionState).forEach(reaction => {
            if (reactionState[reaction]) {
                prevReact = reaction;
                prevSetFlag = true;
            }
            if (reaction === id) {
                currReact = reaction;
            }
            if (reaction === id && reactionState[reaction]) {
                reactionState[reaction] = false;
                currReact = null;
            } else {
                reactionState[reaction] = reaction === id;
            }
        });
        if (!prevSetFlag) prevReact = null;

        if (prevReact === currReact) reactions[currReact] -= 1;
        else if (!prevReact) reactions[currReact] += 1;
        else {
            reactions[prevReact] -= 1;
            reactions[currReact] += 1;
        }

        this.setState({ reactionState, reactions, prevReact, currReact });
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
                this.setState({reactions, loading: false});
            })
            .catch(err => console.log(err));
    }

    triggerUpload = () => {
       document.getElementById("fileUpload" + this.props.postId).click()
    }
    
    render() {
        const {reactionState, reactions, userLogged, loading} = this.state;
        let replyButtonStyle = {float: "right"};
        return (
            <div>
                <ButtonGroup className="reactions-group">
                    <Button id="like" outline={!reactionState.like} disabled={!userLogged || loading}
                            onClick={(e) => this.toggleReact(e)}>&#x1F44D; {reactions.like}</Button>
                    <Button id="dislike" outline={!reactionState.dislike} disabled={!userLogged || loading}
                            onClick={(e) => this.toggleReact(e)}>&#x1F44E; {reactions.dislike}</Button>
                    <Button id="love" outline={!reactionState.love} disabled={!userLogged || loading}
                            onClick={(e) => this.toggleReact(e)}>&#x2764; {reactions.love}</Button>
                    <Button id="laugh" outline={!reactionState.laugh} disabled={!userLogged || loading}
                            onClick={(e) => this.toggleReact(e)}>&#x1F602; {reactions.laugh}</Button>
                    <Button id="fire" outline={!reactionState.fire} disabled={!userLogged || loading}
                            onClick={(e) => this.toggleReact(e)}>&#x1F525; {reactions.fire}</Button>
                </ButtonGroup>
                {userLogged && (this.props.layer < 5) &&
                <div style={replyButtonStyle} onClick={this.triggerUpload}>
                    <Button id={"replyButton"} color={"success"}>Reply</Button>
                    <Input id={"fileUpload" + this.props.postId}
                            style={{display:"none", visibility:"hidden"}}
                            type="file" accept=".jpg, .png, .gif"
                            onChange={this.handleReplyUpload}/>
                    <div style={{float: "right"}}>

                    </div>
                </div>
                }
                <div style={{padding: "10px"}}/>
            </div>
        );
    }
}