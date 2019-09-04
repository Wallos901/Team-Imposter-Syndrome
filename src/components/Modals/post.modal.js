import React from 'react';
import {ModalBody} from 'reactstrap';
import Comments from "../comments.component";

export default class PostModal extends React.Component {
    render() {
        return (
            <div>
                <ModalBody className={"modal-body"}>
                    <img src={this.props.imageUrl} alt={"some alt text"} width='100%'/>
                    <Comments/>
                </ModalBody>
            </div>
        );
    }
}