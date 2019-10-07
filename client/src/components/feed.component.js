import React from "react";
import Masonry from 'react-masonry-css';
import { Form, FormGroup, CustomInput, Col, Row, Button } from "reactstrap";

import CardComp from "./card.component";
import LoadingComp from "./loading.component";
import { getAll } from "../utilities/download.util";

import '../styling.css' ;

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
            limit: localStorage.pageSize ? parseInt(localStorage.pageSize) : 10,
            itemsOnPage: 0,
            category: "Most Popular",
            loadedAllPosts: false,
            loading: true,
            loadedPosts: [],
            postGrid: [],
            userLogged: localStorage.user ? JSON.parse(localStorage.user) : null
        };
    }

    async componentDidMount() {
        this.setState({
            loadedPosts: await getAll(`posts/sort/${this.state.category}?limit=${this.state.limit}`),
            postGrid:[]
        });
        this.updateFeed();
    }

    async shouldComponentUpdate(prevProps, nextProps) {
        if(prevProps.update !== this.props.update){
            // If there are more images to load and page thinks its loaded all the images, add see more button
            // And only update the page if it has loaded all the images. 
            let nextPost = await getAll(`posts/sort/${this.state.category}?skip=${this.state.itemsOnPage}&limit=${this.state.limit}`);
            if (nextPost.length > 0 && this.state.loadedAllPosts) {
                // If there are already a number of items on page divisible by the page size limit
                if (!(this.state.itemsOnPage%this.state.limit===0)) {
                    this.setState({
                        loadedPosts: await getAll(`posts/sort/${this.state.category}?limit=${this.state.limit}`),
                        postGrid: []
                    });
                    this.updateFeed();
                } else {
                    this.setState({
                        loadedAllPosts: false,
                    });
                }
            }
        }
    }

    async handleFilterChange(category) {
        this.setState({
            category: category.target.value,
            loadedPosts: await getAll(`posts/sort/${category.target.value}?limit=${this.state.limit}`),
            postGrid: [],
            loadedAllPosts: false,
        });
        this.updateFeed();
    }

    async handleSizeChange(size) {
        localStorage.pageSize = parseInt(size.target.value);
        this.setState({
            limit: parseInt(size.target.value),
            loadedPosts: await getAll(`posts/sort/${this.state.category}?limit=${size.target.value}`),
            postGrid: [],
            loadedAllPosts: false,
        });
        this.updateFeed();
    }

    updateFeed() {
        if(this.state.loadedPosts.length < parseInt(localStorage.pageSize)) {
            this.setState({
                loadedAllPosts: true,
            });
        }
        if(this.state.loadedPosts.length > 0) {
            this.state.loadedPosts.forEach((post) => {
                this.setState(prevState => ({
                    postGrid: [...prevState.postGrid,
                        <CardComp imageUrl={post.imageURL} userId={post.userID} postId={post._id} key={post._id} postDeleted={post.deleted} createdAt={post.createdAt}/>]
                    }));
            });
        }
        this.setState({
            loading: false,
            itemsOnPage: this.state.postGrid.length,
        });
    }

    loadMorePosts = async () => {
        this.setState({ loading: true });
        this.setState({
            loadedPosts: await getAll(`posts/sort/${this.state.category}?skip=${this.state.itemsOnPage}&limit=${this.state.limit}`)
        });
        this.updateFeed();
    }

    render() {
        const { userLogged, postGrid } = this.state;
        const username = userLogged ? " " + userLogged.username : "";
        return (
            <div style={{marginBottom: "20px"}}>
                <div>
                    <div>
                        <Form className="mt-3 mb-3">
                            <Row form>
                                <Col md={6}>
                                    <h3>Welcome,{ username }!</h3>
                                </Col>
                                <Col md={2}>
                                    Page Size: 
                                    <FormGroup>
                                        <CustomInput type="select" name="select" id="size" disabled={this.state.loading} defaultValue={this.state.limit} onChange={(size) => this.handleSizeChange(size)}>
                                            <option>10</option>
                                            <option>25</option>
                                            <option>50</option>
                                        </CustomInput>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    Filter: 
                                    <FormGroup>
                                        <CustomInput type="select" name="select" id="filter" disabled={this.state.loading} onChange={(category) => this.handleFilterChange(category)}>
                                            <option>Most Popular</option>
                                            <option>Latest</option>
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
                    <div>
                        {this.state.postGrid.length>0 &&
                        <Masonry
                            breakpointCols={ dynamicColumnBreakpoints }
                            className="post-grid"
                            columnClassName="post-container"
                        >
                        { postGrid }
                        </Masonry>
                        }
                        {this.state.loading && 
                            <LoadingComp/>
                        } 
                        {(!this.state.loadedAllPosts && this.state.postGrid.length>0) && 
                        <Button style={{width:"100%"}} color="secondary" disabled={this.state.loading} onClick={this.loadMorePosts}>See more</Button>
                        }
                    </div>
                    {!this.state.loading && this.state.postGrid.length===0 &&
                    <div>No posts available :(</div>
                    }
                </div>
            </div>
        );
    }
}
