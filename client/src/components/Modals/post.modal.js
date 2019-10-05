import React from 'react';
import {Button, ModalBody, ModalHeader} from 'reactstrap';
import Responses from "../responses.component";
import Reactions from "../reactions.component";
import SignInModal from "./signin.modal";
import '../../styling.css'

export default class PostModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageMaxHeight: this.setMaxHeight(),
            update: true,
        };
    }

    setMaxHeight() {
        return window.innerHeight * 0.7;
    }

    reloadResponses = () => {
        this.setState({
            update: !this.state.update,
        });
    };

    render = () => {
        return (
            <div>
                <ModalHeader toggle={this.props.closeModal}>{this.props.username}</ModalHeader>
                <ModalBody className={"modal-body"}>
                    <div>
                        <img style={{
                            maxHeight: this.state.imageMaxHeight,
                            maxWidth: "100%",
                            marginLeft: "auto",
                            marginRight: "auto",
                            display: "block"
                        }} src={this.props.imageUrl}
                             alt={"some alt text"}/>
                    </div>
                    <hr/>
                    <div>
                        <Reactions reRenderParent={this.reloadResponses} update={this.state.update}
                                   userId={this.props.userId} postId={this.props.postId}/>
                        <Button color={"danger"} size={"sm"} outline>Report</Button>
                    </div>
                    {!localStorage.user &&
                    <div>
                        <SignInModal type={"login"} heading=" to Respond" closeModal={null}/>
                    </div>
                    }
                    <Responses update={this.state.update} userId={this.props.userId} postId={this.props.postId}/>
                </ModalBody>
            </div>
        );
    }
}