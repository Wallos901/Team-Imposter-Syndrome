import React from 'react';
import {ModalHeader, ModalBody} from 'reactstrap';
import Comments from "../comments.component";

export default class PostModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ModalHeader>{this.props.title}</ModalHeader>
                <ModalBody class={"modal-body"}>
                    <img src={this.props.imageUrl} alt={"some alt text"}/>
                    <Comments/>
                </ModalBody>
            </div>
        );
    }
}