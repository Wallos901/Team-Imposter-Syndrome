import React from 'react';
import { ModalHeader, ModalBody } from 'reactstrap';

export default class SettingsModal extends React.Component {
    render() {
        return (
            <div>
                <ModalHeader>Settings</ModalHeader>
                <ModalBody>
                    No changes allowed >:)
                </ModalBody>
            </div>
        );
    }
}