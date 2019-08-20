import React from 'react';
import {ModalHeader, ModalBody} from 'reactstrap';
import Comments from "../comments.component";

export default class PostModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ModalHeader>Image Here</ModalHeader>
                <ModalBody>
                    <Comments/>
                </ModalBody>
            </div>
        );
    }
}