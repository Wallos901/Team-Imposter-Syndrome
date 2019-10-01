import React from "react";

import '../styling.css' ;
import Masonry from 'react-masonry-css';

import CardComp from "./card.component";
import { getAll } from "../utilities/download.util";

const dynamicColumnBreakpoints = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
};

export default class FeedComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedPosts: [],
            postGrid: [],
        };
    }

    async componentDidMount() {
        // Load All Posts
        this.setState({
            loadedPosts: await getAll("posts")
        });
        this.state.loadedPosts.forEach((post) => {
            this.setState(prevState => ({
                postGrid: [...prevState.postGrid,
                    <CardComp imageUrl={post.imageURL} userId={post.userID} username={post.user[0].username} postId={post._id} key={post._id} createdAt={post.createdAt}/>]
            }));
        });
    }

    render() {
            return (
                <Masonry
                    breakpointCols={dynamicColumnBreakpoints}
                    className="post-grid"
                    columnClassName="post-container"
                >
                    {this.state.postGrid}
                </Masonry>
            );
    }
}
