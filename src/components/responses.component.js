import React from 'react';
import UploadModal from "./Modals/upload.modal";
import SignInModal from "./Modals/signin.modal";

export default class Responses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedComments: {},
            // how do i find this out
            loggedIn: false,
        };
    }

    async componentDidMount() {
        // EVENTUALLY THIS WILL LOAD THE COMMENTS - ps this doesn't work yet
        // alert(this.props.postId);
        // Load All Comments
        // this.setState({
        //     loadedComments: await getAll("posts/replies", "?postID="+this.props.postId)
        // });
        // this.state.loadedComments.forEach((comment) => {
        //     this.setState(prevState => ({
        //         postGrid: [...prevState.postGrid,
        //             <CardComp commentImg={comment.content} userId={comment.user_id} key={comment._id} createdAt={comment.createdAt}/>]
        //     }));
        // });
    }

    render() {
        return (
            <div>
                <hr/>
                <h3>Responses</h3>
                <hr/>
                <div>
                    <ul className={"comment-list-parent"}>
                        <li><img className={"comment-post"}
                                 alt=""
                                 src={"https://www.abc.net.au/radionational/image/6289622-4x3-340x255.png"}/>
                            <ul className={"comment-list"}>
                                <li><img className={"comment-post"}
                                         alt=""
                                         src={"http://www.cairowestmag.com/wp-content/uploads/2018/09/Orange.jpg"}/>
                                    <ul className={"comment-list"}>
                                        <li><img className={"comment-post"}
                                                 alt=""
                                                 src={"https://colourlex.com/wp-content/uploads/2014/12/bleizinngelb-farbbuch-opt.jpg"}/>
                                        </li>
                                    </ul>
                                </li>
                                <li><img className={"comment-post"}
                                         alt=""
                                         src={"https://cdn.shopify.com/s/files/1/0882/1686/products/1_f87fbb63-1587-40ad-b2df-57e94acfa608.jpg?v=1493726820"}/>
                                </li>
                            </ul>
                        </li>
                        <hr/>
                        <li><img className={"comment-post"}
                                 alt=""
                                 src={"https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2013/8/1/1375354802439/Blue---the-colour-008.jpg?width=300&quality=85&auto=format&fit=max&s=2a7663fea4602034647ecb92ae228d96"}/>
                            <ul className={"comment-list"}>
                                <li><img className={"comment-post"}
                                         alt=""
                                         src={"https://miro.medium.com/max/400/1*bNfxs62uJzISTfuPlOzOWQ.png"}/></li>
                            </ul>
                        </li>
                    </ul>
                </div>


                <h2>Respond</h2>
                {this.state.loggedIn &&
                    <UploadModal
                        closeModal={null}
                        parentId={this.props.postId}
                    />
                }
                {!this.state.loggedIn &&
                    <div>
                        <SignInModal type={"login"} heading=" to Respond" closeModal={null}/>
                    </div>
                }
            </div>
        );
    }
}