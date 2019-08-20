import React from 'react';
import {ModalBody, ModalHeader} from "reactstrap";

export default class UploadModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ModalHeader>Upload Image</ModalHeader>
                <ModalBody>
                    <div>Upload images. No text allowed. Reeee</div>
                </ModalBody>
            </div>
        );
    }
}