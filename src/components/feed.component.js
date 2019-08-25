import React from "react";

import CardComp from "./card.component";

const axios = require('axios');

export default class FeedComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedPosts: {},
            postCardComps: [],
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
                postCardComps: [...prevState.postCardComps, <CardComp imageUrl={post.content} userId={post.user_id} key={post._id} createdAt={post.createdAt} />]
            }));
        });
    }

    async shouldComponentUpdate(nextProps, nextState){
        // Load All Posts
        if(this.props !== nextProps) {
            // await this.getAllPosts();
            // this.state.loadedPosts.forEach((post) => {
            //     this.setState(prevState => ({
            //         postCardComps: [...prevState.postCardComps,
            //             <CardComp imageUrl={post.content} userId={post.user_id} key={post._id}
            //                       createdAt={post.createdAt}/>]
            //     }));
            // });
            console.log('yeehaw');
        }
    }

    render() {
        return (
            <div>
                {this.state.postCardComps}
            </div>
        );
    }
}
