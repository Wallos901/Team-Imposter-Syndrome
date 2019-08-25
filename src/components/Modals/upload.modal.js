import React from 'react';
import ReactS3 from 'react-s3';
import axios from "axios";
import {ModalBody, ModalHeader, Form, FormGroup, Input, FormText, Button} from "reactstrap";

const config = {
    bucketName: "discussion-board",
    dirName: "photos",
    region: "ap-southeast-2",
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY
};

export default class UploadModal extends React.Component {
    constructor(props) {
        super(props);

        this.handleUploadClick = this.handleUploadClick.bind(this);

        this.state = {}
    }

    handleUploadClick() {
        if (document.getElementById("fileUpload").value !== "") {
            ReactS3.uploadFile(document.getElementById("fileUpload").value, config)
                .then(data => {
                    const post = {
                        content: data.location,
                        alt_text: "default",
                        user_id: "12345678",
                        status_id: "APPROVED"
                    };

                    axios.post("http://localhost:5000/posts/add/", post)
                        .then(res => {
                            alert("Post uploaded successfully!");
                            document.getElementById("fileUpload").value = "";
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    render() {
        return (
            <div>
                <ModalHeader>Upload Image</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Input id="fileUpload" type="file"/>
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