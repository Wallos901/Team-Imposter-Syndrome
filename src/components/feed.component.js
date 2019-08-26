import React from "react";

import '../styling.css' ;
import Masonry from 'react-masonry-component';

import CardComp from "./card.component";
import {Col, Row} from "reactstrap";

const axios = require('axios');

const masonryOptions = {
    transitionDuration: 1000
};
const imagesLoadedOptions = { backgroundColor: '#FF0000' };

export default class FeedComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedPosts: {},
            postGrid: [],
        };
    }

    async getAllPosts() {
        await axios.get("http://localhost:5000/posts")
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
                    <div key={post._id}>
                        <CardComp imageUrl={post.content} userId={post.user_id} key={post._id} createdAt={post.createdAt}/>
                    </div>]
            }));

        });
    }

    render() {
        return (
            <Masonry
                className={'post-gallery'}
                elementType={'div'}
                options={masonryOptions}
                imagesLoadedOptions={imagesLoadedOptions}
            >
                {this.state.postGrid}
            </Masonry>
        );
    }
}
