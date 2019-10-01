import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import '../styling.css' ;

import NavbarComp from "./navbar.component";
import FeedComp from "./feed.component";
import ProfileComp from "./profile.component";
import AdminComp from "./admin.component";

export default class HomepageComp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            update: true,
        };
    }

    updateFeed = () => {
        this.setState({
            update: !this.state.update,
        });
    };

    render() {
        return (
            <Router>
                <div>
                    <NavbarComp afterUpload={this.updateFeed}/>
                </div>
                <div className="container">
                    <Route path="/" exact component={FeedComp} update={this.state.update}/>
                    <Route path="/profile" exact component={ProfileComp} />
                    <Route path="/admin" exact component={AdminComp} />
                </div>
            </Router>
        );
    }
}
