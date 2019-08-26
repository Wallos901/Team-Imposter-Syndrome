import React from "react";

import '../styling.css' ;

import CardComp from "./card.component";
import {Row, Col} from "reactstrap";

const axios = require('axios');

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
        const rowSize = 4;
        let counter = 0;
        const grid = [];
        let row = [];
        // Organise posts into rows and columns in the grid.
        this.state.loadedPosts.forEach((post) => {
            if (counter%rowSize===0 && counter!==0) {
                grid.push(<Row key={'row_'+counter/4}>{row}</Row>);
                row = [];
            }
            row.push(<Col className={'post-column'} style={{padding:5}} key={'column_'+counter}>
                <CardComp imageUrl={post.content} userId={post.user_id} key={post._id} createdAt={post.createdAt} />
            </Col>);
            counter++;
        });
        if(row.length > 0){
            grid.push(<Row key={'row_'+counter/4+1}>{row}</Row>)
        }
        this.setState(prevState => ({
            postGrid: [...prevState.postGrid, grid]
        }));
    }

    render() {
        return (
            <div>
                {this.state.postGrid}
            </div>
        );
    }
}
