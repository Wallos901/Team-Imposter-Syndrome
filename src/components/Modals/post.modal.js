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
                <Modal size={"xl"} isOpen={this.state.showModal} toggle={this.toggleModal}>
                    <ModalHeader>{this.props.title}</ModalHeader>
                    <ModalBody class={"modal-body"}>
                        <img src={this.props.imageUrl} alt={"some alt text"}/>
                        <Comments/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary">
                            Reply
                        </Button>
                        <Button color="secondary" onClick={this.toggleModal}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}