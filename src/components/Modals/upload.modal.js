import React from 'react';
import {ModalBody, ModalHeader, Alert, Form, FormGroup, Input, CustomInput, FormText, Button, ModalFooter} from "reactstrap";
import Upload from "../../utilities/upload.util";

export default class UploadModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error_msg: ""
        }
    }
    handleUploadClick = () => {
        let file = document.getElementById("fileUpload");
        let category = document.getElementById("category");
        if (file.value !== "" && category.value !== "") {
            if (Upload(document.getElementById("fileUpload").files[0], null, category.value)){
                document.getElementById("fileUpload").value = "";
            } else {
                alert('Error uploading image.');
            }
        }
        else {
            if (category.value === "") this.setState({ error_msg: "Please select a category for your image." });
            else if (file.value === "") this.setState({ error_msg: "Please select an image to upload." });
        }
    };

    render() {
        const { error_msg } = this.state;
        return (
            <div>
                <ModalHeader>Upload Image</ModalHeader>
                <ModalBody>
                    <Alert color="danger" isOpen={ error_msg !== "" }>
                        { error_msg }
                    </Alert>
                    <Form>
                        <FormGroup>
                            <CustomInput type="select" name="select" id="category">
                                <option value="">Select a category...</option>
                                <option>Animal</option>
                                <option>Fashion</option>
                                <option>Food</option>
                                <option>Funny</option>
                                <option>Landscape</option>
                                <option>Nature</option>
                                <option>Random</option>
                                <option>Sports</option>
                                <option>Travel</option>
                                <option>Vehicle</option>
                            </CustomInput>
                        </FormGroup>
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