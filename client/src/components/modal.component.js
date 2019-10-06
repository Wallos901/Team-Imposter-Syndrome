import React from 'react';
import {Button, CardImg, DropdownItem, Modal, ModalFooter, NavLink} from 'reactstrap';
import PostModal from "./Modals/post.modal";
import UploadModal from "./Modals/upload.modal";
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
                    {(() => {
                        switch (this.props.type) {
                            case "post":
                                return <PostModal imageUrl={this.props.imageUrl} userId={this.props.userId}
                                                  postId={this.props.postId} username={this.props.username}
                                                  postDeleted={this.props.postDeleted} closeModal={() => this.toggleModal()}/>;
                            case "upload":
                                return <UploadModal
                                    closeModal={() => this.toggleModal()}
                                    afterUpload={this.props.afterUpload}
                                />;
                            case "leaderboard":
                                return <LeaderboardModal closeModal={() => this.toggleModal()}/>;
                            case "settings":
                                return <SettingsModal closeModal={() => this.toggleModal()}/>;
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
                    {this.props.type !== 'upload' && this.props.type !== 'login' && this.props.type !== 'register' && this.props.type !== 'leaderboard' &&
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                    }
                </Modal>

            </div>
        );
    }
}