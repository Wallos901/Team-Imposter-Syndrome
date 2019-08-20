import React from 'react';
import {Button, DropdownItem, Modal, ModalBody, ModalFooter, NavLink} from 'reactstrap';
import PostModal from "./Modals/post.modal";
import UploadModal from "./Modals/upload.modal";
import ProfileModal from "./Modals/profile.modal";

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
                {(() => {
                    switch (this.props.type) {
                        case "upload":
                            return <NavLink onClick={this.togglePostModal}>{this.props.text}</NavLink>;
                        case "profile":
                            return <DropdownItem onClick={this.togglePostModal}>{this.props.text}</DropdownItem>;
                        default:
                            return <Button onClick={this.togglePostModal}>{this.props.text}</Button>;
                    }
                })()}
                <Modal isOpen={this.state.showPostModal} toggle={this.togglePostModal}>
                    <ModalBody>
                        {(() => {
                            switch (this.props.type){
                                case "post":
                                    return <PostModal/>;
                                case "upload":
                                    return <UploadModal/>;
                                case "profile":
                                    return <ProfileModal/>;
                                default:
                                    return;
                            }
                        })()}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.togglePostModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}