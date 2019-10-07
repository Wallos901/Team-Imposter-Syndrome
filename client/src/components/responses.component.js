import React from 'react';
import { getAll } from "../utilities/download.util";
import { Button } from "reactstrap";

import LoadingComp from "./loading.component";
import Response from './response.component';

export default class Responses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: this.props.layer===1 ? 5 : 2,
            maxLayers: this.props.maxLayers,
            itemsOnPage: 0,
            loadedComments: {},
            commentThread: [],
            loadedAllComments: false,
            loading: true,
            userLogged: localStorage.user ? JSON.parse(localStorage.user) : false,
        };
    }

    checkIfLoadMore() {
        if (this.state.loadedAllComments || this.state.commentThread.length===0) {
            this.loadComments();
        }
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
                        <Response 
                        key={comment._id}
                        postId={comment._id} 
                        imageURL={comment.imageURL}
                        userId={this.props.userId} 
                        loadComments={() => this.loadComments()}
                        update={this.props.update}
                        layer={this.props.layer} 
                        maxLayers={this.props.maxLayers}/>
                    ],
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
            this.checkIfLoadMore();
        }
    }

    render() {
        return (
            <div>
                {this.state.loading &&
                    <LoadingComp/>
                }
                {(this.state.commentThread).length > 0 &&
                <div>
                    <div>
                        <ul className={"comment-list-parent"}>
                            {this.state.commentThread}
                            {this.state.loading && 
                                <LoadingComp key={"loadingBoi"}/>
                            }
                            {(!this.state.loadedAllComments && this.state.commentThread.length>0) && 
                                <Button key={"SeeMore"} style={{width:"100%"}} color="secondary" disabled={this.state.loading} onClick={this.loadComments}>See more</Button>
                            }
                        </ul>
                    </div>
                </div>
                }
            </div>
        );
    }
}