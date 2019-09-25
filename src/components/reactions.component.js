import React from 'react';
import {Button, ButtonGroup} from "reactstrap";

export default class Responses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            likeFilled: false,
            dislikeFilled: false,
            loveFilled: false,
            fireFilled: false
        };
    }

    render() {
        return (
            <ButtonGroup className="reactions-group">
                <Button outline={!this.state.likeFilled} color={"primary"} onClick={() => this.toggleLikeReact()}><span role="img" aria-label="like">&#x1F44D;</span></Button>
                <Button outline={!this.state.dislikeFilled} color={"secondary"} onClick={() => this.toggleDislikeReact()}><span role="img" aria-label="dislike">&#x1F44E;</span></Button>
                <Button outline={!this.state.loveFilled} color={"danger"} onClick={() => this.toggleLoveReact()}><span role="img" aria-label="love">&#x2764;</span></Button>
                <Button outline={!this.state.fireFilled} color={"warning"} onClick={() => this.toggleFireReact()}><span role="img" aria-label="fire">&#x1F525;</span></Button>
            </ButtonGroup>
        );
    }

    toggleLikeReact() {
        this.setState(prevState => ({
            likeFilled: !prevState.likeFilled
        }))
    }

    toggleDislikeReact() {
        this.setState(prevState => ({
            dislikeFilled: !prevState.dislikeFilled
        }))
    }

    toggleLoveReact() {
        this.setState(prevState => ({
            loveFilled: !prevState.loveFilled
        }))
    }

    toggleFireReact() {
        this.setState(prevState => ({
            fireFilled: !prevState.fireFilled
        }))
    }
}