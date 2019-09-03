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
            loadedWords: '',
            postGrid: [],
            test: [],
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async getAllWords() {
        await axios.get("http://localhost:5000/words")
            .then((response) => {
                this.setState({
                    loadedWords: response.data
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
        await this.getAllWords();
        // this.state.loadedWords.forEach((post) => {
        //     this.setState(prevState => ({
        //         postGrid: [...prevState.postGrid,
        //             <CardComp imageUrl={post.content} userId={post.user_id} key={post._id} createdAt={post.createdAt}/>]
        //     }));
        //
        // });
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        for (var i = 0; i < this.state.loadedWords.length; i++) {
            console.log(this.state.loadedWords[i].word);
            if (this.state.value === this.state.loadedWords[i].word) {
                var correctGuess = true;
                break;
            } else {
                correctGuess = false;
            }
        }
        if (correctGuess) {
            alert('Your guess was correct!');
        } else {
            alert('Your guess was incorrect!')
        }
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Your guess:
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Check"/>
            </form>
        );
    }

}
