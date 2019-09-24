import React from 'react';
import {ModalBody, ModalHeader, Form, FormGroup, Input, FormText, Button, ModalFooter} from "reactstrap";
import Upload from "../../utilities/upload.util";

export default class UploadModal extends React.Component {
    handleUploadClick = () => {
        if (document.getElementById("fileUpload").value !== "") {
            if (Upload(document.getElementById("fileUpload").files[0], "post")){
                document.getElementById("fileUpload").value = "";
            }
            else {
                alert('Error uploading image.');
            }
        }
        else {
            alert('Please select an image/gif to upload.');
        }
    };

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
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleUploadClick}>Upload</Button>
                    <Button color="secondary" onClick={this.props.closeModal}>Close</Button>
                </ModalFooter>
            </div>
        );
    }
}