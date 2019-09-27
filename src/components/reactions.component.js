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
        const { reactionState } = this.state;
        const user = JSON.parse(localStorage.user);
        if (this.props.postId in user.post_reactions) {
            reactionState[user.post_reactions[this.props.postId]] = true;
        }
        this.setState({ reactionState });
        this.getPostReactions();
    }

    

    toggleReact(event) {
        let { id } = event.target;
        let { reactionState } = this.state;
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

        this.setState({ reactionState });

        if (nullFlag) id = null;

        axios.post("http://localhost:5000/api/users/updateReaction", { reaction: id, username: JSON.parse(localStorage.user).username, postID: this.props.postId })
            .then(res => {
                localStorage.user = JSON.stringify(res.data);
            })
            .catch(err => console.log(err));

        axios.post("http://localhost:5000/api/posts/updateReaction", { postID: this.props.postId, prevReact: prevReact, currReact: currReact })
            .then(() => this.getPostReactions())
            .catch(err => console.log(err));
    }

    getPostReactions() {
        let { reactions } = this.state;
        axios.post("http://localhost:5000/api/posts/getReactions", { postID: this.props.postId })
            .then(res => {
                reactions.like = res.data.like;
                reactions.dislike = res.data.dislike;
                reactions.love = res.data.love;
                reactions.fire = res.data.fire;
                this.setState({ reactions });
            })
            .catch(err => console.log(err));
    }

    render() {
        const { reactionState, reactions } = this.state;
        return (
            <div>
                <ButtonGroup className="reactions-group">
                    <Button id="like" outline={!reactionState.like} color={"primary"} onClick={(e) => this.toggleReact(e)}>&#x1F44D;</Button>
                    <Button id="dislike" outline={!reactionState.dislike} color={"secondary"} onClick={(e) => this.toggleReact(e)}>&#x1F44E;</Button>
                    <Button id="love" outline={!reactionState.love} color={"danger"} onClick={(e) => this.toggleReact(e)}>&#x2764;</Button>
                    <Button id="fire" outline={!reactionState.fire} color={"warning"} onClick={(e) => this.toggleReact(e)}>&#x1F525;</Button>
                </ButtonGroup>
                <div style={{ float: "right" }}>
                    <h4>
                        <span style={{ marginLeft: "50px" }}>&#x1F44D;: { reactions.like }</span>
                        <span style={{ marginLeft: "50px" }}>&#x1F44E;: { reactions.dislike }</span>
                        <span style={{ marginLeft: "50px" }}>&#x2764;: { reactions.love }</span>
                        <span style={{ marginLeft: "50px" }}>&#x1F525;: { reactions.fire }</span>
                    </h4>
                </div>
            </div>
        );
    }
}