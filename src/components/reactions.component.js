/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import {Button, ButtonGroup} from "reactstrap";
import axios from "axios";

export default class Responses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reactionState: {
                like: false,
                dislike: false,
                love: false,
                fire: false
            }
        };
    }

    componentDidMount() {
        const { reactionState } = this.state;
        const user = JSON.parse(localStorage.user);
        if (this.props.postId in user.post_reactions) {
            reactionState[user.post_reactions[this.props.postId]] = true;
        }
        this.setState({ reactionState });
    }

    toggleReact(event) {
        let { id } = event.target;
        const { reactionState } = this.state;
        let nullFlag = false;

        Object.keys(reactionState).forEach(reaction => {
            if (reaction === id && reactionState[reaction]) {
                reactionState[reaction] = false;
                nullFlag = true;
            } else {
                reactionState[reaction] = reaction === id;
            }
        });

        this.setState({ reactionState });

        if (nullFlag) id = null;

        axios.post("http://localhost:5000/api/users/updateReaction", { reaction: id, username: JSON.parse(localStorage.user).username, postID: this.props.postId })
            .then(res => {
                localStorage.user = JSON.stringify(res.data);
            })
            .catch(err => console.log(err));
    }

    render() {
        const { reactionState } = this.state;
        return (
            <ButtonGroup className="reactions-group">
                <Button id="like" outline={!reactionState.like} color={"primary"} onClick={(e) => this.toggleReact(e)}>&#x1F44D;</Button>
                <Button id="dislike" outline={!reactionState.dislike} color={"secondary"} onClick={(e) => this.toggleReact(e)}>&#x1F44E;</Button>
                <Button id="love" outline={!reactionState.love} color={"danger"} onClick={(e) => this.toggleReact(e)}>&#x2764;</Button>
                <Button id="fire" outline={!reactionState.fire} color={"warning"} onClick={(e) => this.toggleReact(e)}>&#x1F525;</Button>
            </ButtonGroup>
        );
    }
}