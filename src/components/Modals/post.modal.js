import React from 'react';
import {ModalBody} from 'reactstrap';
import Responses from "../responses.component";
import Reactions from "../reactions.component";
import SignInModal from "./signin.modal";

export default class PostModal extends React.Component {
    render() {
        return (
            <div>
                <ModalBody className={"modal-body"}>
                    <img src={this.props.imageUrl} alt={"some alt text"} width='100%'/>
                    <hr/>
                    <Reactions userId={this.props.userId} postId={this.props.postId}/>
                    {!localStorage.user &&
                    <div>
                        <SignInModal type={"login"} heading=" to Respond" closeModal={null}/>
                    </div>
                    }
                    <Responses userId={this.props.userId} postId={this.props.postId}/>
                </ModalBody>
            </div>
        );
    }
}