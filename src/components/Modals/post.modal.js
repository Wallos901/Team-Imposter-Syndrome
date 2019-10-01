import React from 'react';
import {ModalBody} from 'reactstrap';
import Comments from "../responses.component";
import Reactions from "../reactions.component";
import '../../styling.css'

export default class PostModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            imageMaxHeight: this.setMaxHeight(),
        };
    }

    setMaxHeight(){
        return window.innerHeight * 0.7;
    }

    render = () => {
        return (
            <div>
                <ModalBody className={"modal-body"}>
                    <div>
                        <img style={{maxHeight: this.state.imageMaxHeight, maxWidth: "100%", marginLeft: "auto", marginRight: "auto", display:"block"}} src={this.props.imageUrl}
                             alt={"some alt text"}/>
                    </div>
                    <hr/>
                    <Reactions userId={this.props.userId} postId={this.props.postId}/>
                    <Comments/>
                </ModalBody>
            </div>
        );
    }
}