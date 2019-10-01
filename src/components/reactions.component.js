/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import {Button, ButtonGroup} from "reactstrap";
import axios from "axios";

export default class Reactions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reactionState: {
                like: false,
                dislike: false,
                love: false,
                fire: false
            },
            reactions: {
                like: 0,
                dislike: 0,
                love: 0,
                fire: 0
            }
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
        axios.post("http://localhost:5000/api/posts/getReactions", {postID: this.props.postId})
            .then(res => {
                reactions.like = res.data.like;
                reactions.dislike = res.data.dislike;
                reactions.love = res.data.love;
                reactions.fire = res.data.fire;
                this.setState({reactions});
            })
            .catch(err => console.log(err));
    }

    render() {
        const {reactionState, reactions} = this.state;
        let replyButtonStyle = {};
        if (localStorage.user) {
            replyButtonStyle = {float: "right"};
        } else {
            replyButtonStyle = {textAlign: "right"};
        }
        return (
            <div>
                {localStorage.user &&
                <ButtonGroup className="reactions-group">
                    <Button id="like" outline={!reactionState.like} color={"primary"}
                            onClick={(e) => this.toggleReact(e)}>&#x1F44D;: {reactions.like}</Button>
                    <Button id="dislike" outline={!reactionState.dislike} color={"secondary"}
                            onClick={(e) => this.toggleReact(e)}>&#x1F44E;: {reactions.dislike}</Button>
                    <Button id="love" outline={!reactionState.love} color={"danger"}
                            onClick={(e) => this.toggleReact(e)}>&#x2764;: {reactions.love}</Button>
                    <Button id="fire" outline={!reactionState.fire} color={"warning"}
                            onClick={(e) => this.toggleReact(e)}>&#x1F525;: {reactions.fire}</Button>
                </ButtonGroup>
                }
                <div style={replyButtonStyle}>
                    <Button>Reply</Button>
                </div>
            </div>
        );
    }
}