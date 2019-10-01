import React from 'react';
import SignInModal from "./Modals/signin.modal";
import {getAll} from "../utilities/download.util";
import Reactions from "./reactions.component";

export default class Responses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedComments: {},
            commentThread: [],
            userLogged: localStorage.user ? JSON.parse(localStorage.user) : false
        };
    }

    async componentDidMount() {
        // Load All Comments
        this.setState({
            loadedComments: await getAll("posts/replies/", this.props.postId)
        });
        this.state.loadedComments.forEach((comment) => {
            this.setState(prevState => ({
                commentThread: [...prevState.commentThread,
                    <li>
                        <img className={"comment-post"}
                             alt=""
                             src={comment.imageURL}
                             style={{maxWidth: "30%"}}
                        />
                        <Reactions userId={this.props.userId} postId={comment._id}/>
                        <hr/>
                    </li>
                ]
            }));
        });
    }

    render() {
        return (
            <div>
                {this.state.userLogged &&
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
                }
            </div>
        );
    }
}