import React from "react";
import { connect } from "react-redux";
import { getPosts } from "../redux/actions/postActions";
import PropTypes from "prop-types";

import '../styling.css' ;
import Masonry from 'react-masonry-css';

import CardComp from "./card.component";

const dynamicColunmBreakpoints = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
};

class FeedComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postGrid: [],
            test: [],
        };
    }

    componentDidMount() {
        this.props.getPosts()
    };

    render() {
        const { posts } = this.props.post;
        return (
            <Masonry
                breakpointCols={dynamicColunmBreakpoints}
                className="post-grid"
                columnClassName="post-container"
            >
                {posts.map(({ content, user_id, _id, createdAt }) => (
                    <CardComp imageUrl={content} userId={user_id} key={_id} createdAt={createdAt}/>
                ))}
            </Masonry>
        );
    }
}

FeedComp.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    post: state.post
});

export default connect(mapStateToProps, { getPosts })(FeedComp)