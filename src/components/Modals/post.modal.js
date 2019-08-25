import React from 'react';
import {ModalHeader, ModalBody, CardImg, Modal, ModalFooter, Button} from 'reactstrap';
import Comments from "../comments.component";

export default class PostModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <CardImg
                    onClick={this.toggleModal}
                    top
                    width="100%"
                    src={this.props.imageUrl}
                    alt="image goes here"
                />
                <ModalHeader>{this.props.title}</ModalHeader>
                <ModalBody size={"xl"} class={"modal-body"}>
                    <img src={this.props.imageUrl} alt={"some alt text"}/>
                    <Comments/>
                </ModalBody>
            </div>
        );
    }
}