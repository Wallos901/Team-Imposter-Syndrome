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
            <ButtonGroup>
                <Button outline={!this.state.likeFilled} color={"primary"} onClick={() => this.toggleLikeReact()}>&#x1F44D;</Button>
                <Button outline={!this.state.dislikeFilled} color={"secondary"} onClick={() => this.toggleDislikeReact()}>&#x1F44E;</Button>
                <Button outline={!this.state.loveFilled} color={"danger"} onClick={() => this.toggleLoveReact()}>&#x2764;</Button>
                <Button outline={!this.state.fireFilled} color={"warning"} onClick={() => this.toggleFireReact()}>&#x1F525;</Button>
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