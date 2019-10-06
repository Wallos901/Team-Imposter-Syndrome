import React from 'react';
import { ModalHeader, ModalBody } from 'reactstrap';

export default class SettingsModal extends React.Component {
    render() {
        return (
            <div>
                <ModalHeader toggle={this.props.closeModal}>Settings</ModalHeader>
                <ModalBody>
                    No changes allowed >:)
                </ModalBody>
            </div>
        );
    }
}