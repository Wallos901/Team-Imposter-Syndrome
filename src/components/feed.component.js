import React from "react";

import '../styling.css' ;
import Masonry from 'react-masonry-css';
import { Form, FormGroup, CustomInput, Col, Row } from "reactstrap";

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
            userLogged: localStorage.user ? JSON.parse(localStorage.user) : null
        };
    }

    async componentDidMount() {
        this.setState({
            loadedPosts: await getAll("posts/sort/Most Popular"),
            postGrid:[]
        });
        
        this.updateFeed();
    }

    async handleFilterChange(event) {
        this.setState({
            loadedPosts: await getAll("posts/sort/" + event.target.value),
            postGrid: []
        });

        this.updateFeed();
    }

    updateFeed() {
        this.state.loadedPosts.forEach((post) => {
            this.setState(prevState => ({
                postGrid: [...prevState.postGrid,
                    <CardComp imageUrl={post.imageURL} userId={post.userID} postId={post._id} key={post._id} createdAt={post.createdAt}/>]
            }));
        });
    }

    render() {
        const { userLogged, postGrid } = this.state;
        const username = userLogged ? " " + userLogged.username : "";
        return (
            <div>
                <div>
                    <Form className="mt-3 mb-3">
                        <Row form>
                            <Col md={8}>
                                <h3>Welcome{ username }!</h3>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <CustomInput type="select" name="select" id="filter" style={{float: "right"}} onChange={(e) => this.handleFilterChange(e)}>
                                        <option>Most Popular</option>
                                        <option>Animal</option>
                                        <option>Fashion</option>
                                        <option>Food</option>
                                        <option>Funny</option>
                                        <option>Landscape</option>
                                        <option>Nature</option>
                                        <option>Random</option>
                                        <option>Sports</option>
                                        <option>Travel</option>
                                        <option>Vehicle</option>
                                    </CustomInput>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <Masonry
                    breakpointCols={ dynamicColunmBreakpoints }
                    className="post-grid"
                    columnClassName="post-container"
                >
                    { postGrid }
                </Masonry>
            </div>
        );
    }
}
