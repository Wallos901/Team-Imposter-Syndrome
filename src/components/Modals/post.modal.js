import React from 'react';
import {ModalHeader, ModalBody} from 'reactstrap';
import Comments from "../comments.component";

export default class PostModal extends React.Component {
    render() {
        return (
            <div>
                <ModalHeader>{this.props.title}</ModalHeader>
                <ModalBody className={"modal-body"}>
                    <img src={this.props.imageUrl} alt={"some alt text"} height='100%' width='100%'/>
                    <Comments/>
                </ModalBody>
            </div>
        );
    }
}