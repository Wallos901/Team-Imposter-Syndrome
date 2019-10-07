/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import {Button, ButtonGroup, Form, FormGroup, FormText, Input, Popover, PopoverBody} from "reactstrap";
import axios from "axios";
import upload from "../utilities/upload.util";

export default class Reactions extends React.Component {
    constructor(props) {
        super(props);
        this.togglePopover = this.togglePopover.bind(this);

        this.state = {
            reactionState: {
                like: false,
                dislike: false,
                love: false,
                laugh: false,
                fire: false
            },
            reactions: {
                like: 0,
                dislike: 0,
                love: 0,
                laugh: 0,
                fire: 0
            },
            userLogged: localStorage.user ? JSON.parse(localStorage.user) : null,

            popoverOpen: false
        };
    }

    componentDidMount() {
        if (localStorage.user) {
            const {reactionState} = this.state;
            const user = JSON.parse(localStorage.user);
            if (this.props.postId in user.post_reactions) {
                reactionState[user.post_reactions[this.props.postId]] = true;
            }
            this.setState({reactionState});
        }
        this.getPostReactions();
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
        let {id} = event.target;
        let {reactionState} = this.state;
        let nullFlag = false;
        let prevReact = null, currReact = null;

        Object.keys(reactionState).forEach(reaction => {
            if (reactionState[reaction]) {
                prevReact = reaction;
            }

            if (reaction === id) {
                currReact = reaction;
            }

            if (reaction === id && reactionState[reaction]) {
                reactionState[reaction] = false;
                nullFlag = true;
            } else {
                reactionState[reaction] = reaction === id;
            }
        });

        this.setState({reactionState});

        if (nullFlag) id = null;

        axios.post("http://localhost:5000/api/users/updateReaction", {
            reaction: id,
            username: JSON.parse(localStorage.user).username,
            postID: this.props.postId
        })
            .then(res => {
                localStorage.user = JSON.stringify(res.data);
            })
            .catch(err => console.log(err));

        axios.post("http://localhost:5000/api/posts/updateReaction", {
            postID: this.props.postId,
            prevReact: prevReact,
            currReact: currReact
        })
            .then(() => this.getPostReactions())
            .catch(err => console.log(err));
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

    makeReactionsLocal() {

    }

    togglePopover() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    triggerUpload = () => {
       document.getElementById("fileUpload" + this.props.postId).click()
    }

    render() {
        const {reactionState, reactions, userLogged} = this.state;
        let replyButtonStyle = {float: "right"};
        return (
            <div>
                <ButtonGroup className="reactions-group">
                    <Button id="like" outline={!reactionState.like} disabled={!userLogged}
                            onClick={(e) => this.toggleReact(e)}>&#x1F44D; {reactions.like}</Button>
                    <Button id="dislike" outline={!reactionState.dislike} disabled={!userLogged}
                            onClick={(e) => this.toggleReact(e)}>&#x1F44E; {reactions.dislike}</Button>
                    <Button id="love" outline={!reactionState.love} disabled={!userLogged}
                            onClick={(e) => this.toggleReact(e)}>&#x2764; {reactions.love}</Button>
                    <Button id="laugh" outline={!reactionState.laugh} disabled={!userLogged}
                            onClick={(e) => this.toggleReact(e)}>&#x1F602; {reactions.laugh}</Button>
                    <Button id="fire" outline={!reactionState.fire} disabled={!userLogged}
                            onClick={(e) => this.toggleReact(e)}>&#x1F525; {reactions.fire}</Button>
                </ButtonGroup>
                {userLogged && (this.props.layer < 5) &&
                <div style={replyButtonStyle} onClick={this.triggerUpload}>
                    <Button id={"replyButton"}>Reply</Button>
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