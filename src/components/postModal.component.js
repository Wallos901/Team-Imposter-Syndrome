import React from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    CardImg
} from "reactstrap";

import "../styling.css";

export default class PostModalComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPostModal: false
        };

        this.togglePostModal = this.togglePostModal.bind(this);
    }

    togglePostModal() {
        this.setState(() => ({
            showPostModal: !this.state.showPostModal
        }));
    }

    render() {
        return (
            <div>
                <CardImg
                    onClick={this.togglePostModal}
                    top
                    width="100%"
                    src={this.props.imageUrl}
                    alt="image goes here"
                />
                <Modal size={"xl"} isOpen={this.state.showPostModal} toggle={this.togglePostModal}>
                    <ModalBody class={"modal-body"}>
                        <img src={this.props.imageUrl} alt={"some alt text"}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary">
                            Reply
                        </Button>
                        <Button color="secondary" onClick={this.togglePostModal}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
