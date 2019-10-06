import React from 'react';
import Reactions from "./reactions.component";
import { getAll } from "../utilities/download.util";
import { Button } from "reactstrap";

import Responses from "./responses.component";
import LoadingComp from './loading.component';

export default class Response extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedReplies: false,
            loadingReplies: false,
            replies: [],
        };
    }

    async componentDidMount() {
        // Check if there is at least 1 reply.
        this.setState({
            loadingReplies: true,
        });
        this.setState({
            replies: await getAll(`posts/replies/${this.props.postId}?limit=1`),
        });
        this.setState({
            loadingReplies: false,
        });
    }

    loadReplies() {
        if(this.state.replies.length > 0){
            // If there are replies, load them.
            this.setState({
                loadedReplies: true,
            });
        }
    }
    
    render() {
        return (
            <li key={this.props.postId}>
                <img className={"comment-post"}
                        alt=""
                        src={this.props.imageURL}
                        style={{maxWidth: "30%"}}
                />
                {(this.props.layer >= this.props.maxLayers && !this.state.loadedReplies && this.state.replies.length>0) && 
                    <Button style={{width:"30%", float: "right"}} color="secondary" onClick={() => this.loadReplies()}>See replies</Button>
                } {this.state.loadingReplies && 
                    <div style={{width:"30%", float: "right"}}>
                        <LoadingComp/>
                    </div>
                }
                <Reactions reRenderParent={this.props.loadComments} userId={this.props.userId} postId={this.props.postId}/>
                {(this.props.layer < this.props.maxLayers || this.state.loadedReplies) &&
                    <Responses
                    postId={this.props.postId} 
                    userId={this.props.userId} 
                    update={this.props.update}
                    layer={this.props.layer+1} 
                    maxLayers={this.props.maxLayers}/>
                }
                <hr/>
            </li>
        )
    }
}