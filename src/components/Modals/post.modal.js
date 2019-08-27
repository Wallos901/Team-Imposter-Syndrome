import React from 'react';
import {ModalHeader, ModalBody} from 'reactstrap';
import Responses from "../responses.component";

export default class PostModal extends React.Component {
    render() {
        return (
            <div>
                <ModalHeader>{this.props.title}</ModalHeader>
                <ModalBody className={"modal-body"}>
                    <img src={this.props.imageUrl} alt={"some alt text"} width='100%'/>
                    <Responses/>
                </ModalBody>
            </div>
        );
    }
}