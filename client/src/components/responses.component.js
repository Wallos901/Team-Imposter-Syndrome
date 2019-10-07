import React from 'react';
import {getAll} from "../utilities/download.util";
import Reactions from "./reactions.component";
import {Button} from "reactstrap";

export default class Responses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedComments: {},
            commentThread: [],
            userLogged: localStorage.user ? JSON.parse(localStorage.user) : false
        };
    }

    loadComments = async () => {
        // Load All Comments
        this.setState({
            commentThread: [],
            loadedComments: await getAll("posts/replies/", this.props.postId),
            update: false,
        });
        if (this.state.loadedComments.length > 0) {
            this.state.loadedComments.forEach((comment) => {
                this.setState(prevState => ({
                    commentThread: [...prevState.commentThread,
                        <li key={comment._id}>
                            <img className={"comment-post"}
                                 alt=""
                                 src={comment.imageURL}
                                 style={{maxWidth: "30%"}}
                            />
                            <div>
                                <Reactions reRenderParent={this.loadComments} userId={this.props.userId}
                                           postId={comment._id}/>
                                <Button color={"danger"} size={"sm"} outline>Report</Button>
                            </div>
                            <hr/>
                        </li>
                    ]
                }));
            });
        }
    };

    async componentDidMount() {
        this.loadComments();
    }

    async shouldComponentUpdate(prevProps, nextProps) {
        if (prevProps.update !== this.props.update) {
            this.loadComments();
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
                        </ul>
                    </div>
                </div>
                }
            </div>
        );
    }
}