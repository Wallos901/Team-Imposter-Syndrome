import React from 'react';

import LoginModal from "./login.modal";
import RegisterModal from "./register.modal";

export default class SignInModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            type: this.props.type,
        };
    }

    toggleModal = () => {
        this.setState(() => ({
            showModal: !this.state.showModal
        }));
    };

    /* change modal layout depending on whether or not user is logging in or registering */
    toggleModalType = () => {
        (this.state.type === "register")
            ? this.setState(() => ({type: "login"}))
            : this.setState(() => ({type: "register"}));
    };

    render() {
        return (
            <div className={"SignInContainer"}>
            {(() => {
                switch (this.state.type) {
                    case "login":
                        return <LoginModal
                            reloadPage={() => window.location.reload()}
                            closeModal={this.props.closeModal}
                            toggle={() =>this.toggleModalType()}
                            heading={this.props.heading}
                        />;
                    case "register":
                        return <RegisterModal
                            reloadPage={() => window.location.reload()}
                            closeModal={this.props.closeModal}
                            toggle={() => this.toggleModalType()}
                            heading={this.props.heading}
                        />;
                    default:
                        return;
                }
            })()}
            </div>
        );
    }
}