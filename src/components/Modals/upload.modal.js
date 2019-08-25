import React from 'react';
import {ModalBody, ModalHeader, Form, FormGroup, Input, FormText, Button} from "reactstrap";
import Upload from "../../utilities/upload/upload.util";

export default class UploadModal extends React.Component {
    constructor(props) {
        super(props);

        this.handleUploadClick = this.handleUploadClick.bind(this);

        this.state = {}
    }

    handleUploadClick() {
        if (document.getElementById("fileUpload").value !== "") {
            Upload(document.getElementById("fileUpload").files[0], "post");
            document.getElementById("fileUpload").value = "";
        }
    }

    render() {
        return (
            <div>
                <ModalHeader>Upload Image</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Input id="fileUpload" type="file" accept=".jpg, .png, .gif"/>
                            <FormText color="muted">
                                Please select a file of type jpg, png, or gif.
                            </FormText>
                        </FormGroup>
                    </Form>
                    <Button onClick={this.handleUploadClick}>Upload</Button>
                </ModalBody>
            </div>
        );
    }
}