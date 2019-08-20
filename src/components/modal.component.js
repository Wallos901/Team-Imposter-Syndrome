import React from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import PostModal from "./Modals/post.modal";
import UploadModal from "./Modals/upload.modal";

export default class ModalComp extends React.Component {
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
                <Button onClick={this.togglePostModal}>{this.props.button}</Button>
                <Modal isOpen={this.state.showPostModal} toggle={this.togglePostModal}>
                    <ModalBody>
                        {this.props.type === 'post' && <PostModal/>}
                        {this.props.type === 'upload' && <UploadModal/>}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.togglePostModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}