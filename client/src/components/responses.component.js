import React from 'react';
import {getAll} from "../utilities/download.util";
import Reactions from "./reactions.component";
import { Button } from "reactstrap";

export default class Responses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 5,
            itemsOnPage: 0,
            loadedComments: {},
            commentThread: [],
            loadedAllComments: false,
            loading: true,
            userLogged: localStorage.user ? JSON.parse(localStorage.user) : false
        };
    }

    loadComments = async () => {
        this.setState({loading: true});
        this.setState({
            loadedComments: await getAll(`posts/replies/${this.props.postId}?skip=${this.state.itemsOnPage}&limit=${this.state.limit}`)
        });
        this.updateThread();
    }

    updateThread() {
        if(this.state.loadedComments.length < this.state.limit) {
            this.setState({
                loadedAllComments: true,
            });
        }
        if(this.state.loadedComments.length > 0){
            this.state.loadedComments.forEach((comment) => {
                this.setState(prevState => ({
                    commentThread: [...prevState.commentThread,
                        <li key={comment._id}>
                            <img className={"comment-post"}
                                 alt=""
                                 src={comment.imageURL}
                                 style={{maxWidth: "30%"}}
                            />
                            <Reactions reRenderParent={this.loadComments} userId={this.props.userId} postId={comment._id}/>
                            <hr/>
                        </li>
                    ]
                }));
            });
        }
        this.setState({
            loading: false,
            itemsOnPage: this.state.commentThread.length,
        });
    }

    async componentDidMount() {
        this.setState({
            loadedComments: await getAll(`posts/replies/${this.props.postId}?limit=${this.state.limit}`),
            commentThread: []
        });
        this.updateThread();
    }

    async shouldComponentUpdate(prevProps, nextProps) {
        if(prevProps.update !== this.props.update){
            this.updateThread();
        }
    }

    render() {
        return (
            <div>
                {(this.state.commentThread).length > 0 &&
                <div>
                    <hr/>
                    <h3>Responses</h3>
                    <hr/>
                    <div>
                        <ul className={"comment-list-parent"}>
                            {this.state.commentThread}
                            {(!this.state.loadedAllComments && this.state.commentThread.length>0) && 
                            <Button style={{width:"100%"}} color="secondary" disabled={this.state.loading} onClick={this.loadComments}>See more</Button>
                            }
                        </ul>
                    </div>
                </div>
                }
            </div>
        );
    }
}