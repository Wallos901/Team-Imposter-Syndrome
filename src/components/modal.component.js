import React from 'react';
import {Button, CardImg, DropdownItem, Modal, ModalFooter, NavLink} from 'reactstrap';
import PostModal from "./Modals/post.modal";
import UploadModal from "./Modals/upload.modal";
import ProfileModal from "./Modals/profile.modal";
import SettingsModal from "./Modals/settings.modal";
import LeaderboardModal from "./Modals/leaderboard.modal";
import SignInModal from "./Modals/signin.modal";

export default class ModalComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
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
            <div className={"modalCompClickable"} tabIndex={"0"}>
                {/* Modal Button */}
                {(() => {
                    switch (this.props.type) {
                        case "upload":
                        case "leaderboard":
                        case "login":
                        case "register":
                            return <NavLink onClick={this.toggleModal}>{this.props.text}</NavLink>;
                        case "settings":
                            return <DropdownItem onClick={this.toggleModal}>{this.props.text}</DropdownItem>;
                        case "post":
                            return (
                                <div>
                                    <CardImg
                                        onClick={this.toggleModal}
                                        width='100%'
                                        src={this.props.imageUrl}
                                        alt="an uploaded image"
                                    />
                                </div>
                            );
                        default:
                            return <Button onClick={this.toggleModal}>{this.props.text}</Button>;
                    }
                })()}

                {/* Modal Contents */}
                <Modal isOpen={this.state.showModal} toggle={this.toggleModal}
                       size={this.props.type === "post" ? "xl" : "m"}>
                    {/*<ModalHeader*/}
                    {(() => {
                        switch (this.props.type) {
                            case "post":
                                return <PostModal imageUrl={this.props.imageUrl} userId={this.props.userId} postId={this.props.postId}/>;
                            case "upload":
                                return <UploadModal
                                    closeModal={() => this.toggleModal()}
                                    upload={this.props.upload}
                                />;
                            case "leaderboard":
                                return <LeaderboardModal/>;
                            case "settings":
                                return <SettingsModal/>;
                            case "login":
                            case "register":
                                return <SignInModal
                                    type={this.props.type}
                                    closeModal={() => this.toggleModal()}
                                />;
                            default:
                                return;
                        }
                    })()}
                    {this.props.type !== 'upload' && this.props.type !== 'login' && this.props.type !== 'register' &&
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                    }
                </Modal>

            </div>
        );
    }
}