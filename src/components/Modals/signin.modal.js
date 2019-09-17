import React from 'react';
import LoginModal from "./login.modal";
import RegisterModal from "./register.modal";

export default class SignInModal extends React.Component {
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
            <div className={"signinContainer"}>
            {(() => {
                switch (this.props.type) {
                    case "login":
                        return <LoginModal closeModal={() => window.location.reload()}/>;
                    case "register":
                        return <RegisterModal closeModal={() => this.toggleModal()}/>;
                    default:
                        return;
                }
            })()}
            </div>
        );
    }
}