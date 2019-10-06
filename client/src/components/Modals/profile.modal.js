import React from 'react';
import { ModalHeader, ModalBody } from 'reactstrap';

export default class ProfileModal extends React.Component {
    render() {
        return (
            <div>
                <ModalHeader>Username Here</ModalHeader>
                <ModalBody>
                    This user is a swell guy(tm)
                </ModalBody>
            </div>
        );
    }
}