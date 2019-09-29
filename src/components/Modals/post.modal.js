import React from 'react';
import {ModalBody} from 'reactstrap';
import Responses from "../responses.component";
import Reactions from "../reactions.component";

export default class PostModal extends React.Component {
    render() {
        return (
            <div>
                <ModalBody className={"modal-body"}>
                    <img src={this.props.imageUrl} alt={"some alt text"} width='100%'/>
                    <hr/>
                    <Reactions userId={this.props.userId} postId={this.props.postId}/>
                    <Responses userId={this.props.userId} postId={this.props.postId}/>
                </ModalBody>
            </div>
        );
    }
}