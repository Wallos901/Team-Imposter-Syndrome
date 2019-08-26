import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import NavbarComp from "./navbar.component";
import FeedComp from "./feed.component";

export default class HomepageComp extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <NavbarComp/>
                </div>
                <div className="container">
                    <FeedComp/>
                </div>
            </Router>
        );
    }
}
