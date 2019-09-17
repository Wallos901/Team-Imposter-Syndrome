import React from "react";

import '../styling.css' ;
import Masonry from 'react-masonry-css';

import CardComp from "./card.component";

const axios = require('axios');

const dynamicColunmBreakpoints = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
};

export default class FeedComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedPosts: {},
            postGrid: [],
            test: [],
        };
    }

    async getAllPosts() {
        await axios.get("http://localhost:5000/api/posts")
            .then((response) => {
                this.setState({
                    loadedPosts: response.data
                });
                return response.data;
            })
            .catch((error) => {
                alert(error);
                return error;
            })
            .finally(() => {
                console.log('Loaded all posts.');
            });
    };

    async componentDidMount() {
        // Load All Posts
        await this.getAllPosts();
        this.state.loadedPosts.forEach((post) => {
            this.setState(prevState => ({
                postGrid: [...prevState.postGrid,
                    <CardComp imageUrl={post.content} userId={post.user_id} key={post._id} createdAt={post.createdAt}/>]
            }));

        });
    }

    render() {
        return (
            <Masonry
                breakpointCols={dynamicColunmBreakpoints}
                className="post-grid"
                columnClassName="post-container"
            >
                {this.state.postGrid}
            </Masonry>
        );
    }
}
