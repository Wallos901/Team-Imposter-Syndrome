import React from 'react';
import {Button, CardImg, DropdownItem, Modal, ModalBody, ModalFooter, NavLink} from 'reactstrap';
import PostModal from "./Modals/post.modal";
import UploadModal from "./Modals/upload.modal";
import ProfileModal from "./Modals/profile.modal";
import SettingsModal from "./Modals/settings.modal";
import LeaderboardModal from "./Modals/leaderboard.modal";

export default class ModalComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState(() => ({
            showModal: !this.state.showModal
        }));
    }

    render() {
        return (
            <div>
                {/* Modal Button */}
                {(() => {
                    switch (this.props.type) {
                        case "upload":
                        case "leaderboard":
                            return <NavLink onClick={this.toggleModal}>{this.props.text}</NavLink>;
                        case "profile":
                        case "settings":
                            return <DropdownItem onClick={this.toggleModal}>{this.props.text}</DropdownItem>;
                        case "post":
                            return (
                                <div>
                                    <CardImg
                                        onClick={this.toggleModal}
                                        width="100%"
                                        src={this.props.imageUrl}
                                        alt="an uploaded image"
                                    />
                                </div>
                            );
                        default:
                            return <Button onClick={this.toggleModal}>{this.props.text}</Button>;
                    }
                })()}

                {/* Modal Body */}
                <Modal isOpen={this.state.showModal} toggle={this.toggleModal} size={this.props.type==="post" ? "xl" : "m"}>
                    {(() => {
                        switch (this.props.type){
                            case "post":
                                return <PostModal imageUrl={this.props.imageUrl}/>;
                            case "upload":
                                return <UploadModal/>;
                            case "leaderboard":
                                return <LeaderboardModal/>;
                            case "profile":
                                return <ProfileModal/>;
                            case "settings":
                                return <SettingsModal/>;
                            default:
                                return;
                        }
                    })()}
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}