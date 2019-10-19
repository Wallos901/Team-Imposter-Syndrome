import React from 'react';
import {Button, CardImg, DropdownItem, Modal, ModalFooter, NavLink} from 'reactstrap';
import PostModal from "./Modals/post.modal";
import UploadModal from "./Modals/upload.modal";
import AboutModal from "./Modals/about.modal";
import LeaderboardModal from "./Modals/leaderboard.modal";
import SignInModal from "./Modals/signin.modal";

/** Modal Component
 * 
 * Handles creating a reactstrap Modal component, by generating default fields for similar modals.
 * 
 * Creates button that opens modal (e.g. Upload, Leaderboard and Login/Register all appear in the navigation bar, so the button is a navigation menu button).
 * 
 * Also passes the Modal content into the specific component with props
 * 
 * Types of Modals in this project:  
 * - Upload
 * - Leaderboard
 * - Login and Register (sign in)
 * - About 
 * - Post
 */
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
                        case "about":
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
                            case "about":
                                return <AboutModal closeModal={() => this.toggleModal()}/>;
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
                    {this.props.type !== 'login' && this.props.type !== 'register' && this.props.type !== 'upload' &&
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggleModal}>Close</Button>
                        </ModalFooter>
                    }
                </Modal>

            </div>
        );
    }
}