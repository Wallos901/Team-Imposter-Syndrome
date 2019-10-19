import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import '../styling.css' ;

import NavbarComp from "./navbar.component";
import FeedComp from "./feed.component";
import ProfileComp from "./profile.component";
import AdminComp from "./admin.component";

/** Homepage Component
 * 
 * Displays the navigation bar, and handles routing.
 * 
 * Home, or "/" location, displays the Feed component of posts. 
 * Profile displays the user profile of the currently logged in user.
 * Admin displays the admin page when an admin user is logged in.
 * 
 * By default, a generic user sees home on log in, and an admin user sees the admin page.
 */
export default class HomepageComp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            update: true,
            userLogged: localStorage.user ? JSON.parse(localStorage.user) : null
        };
    }

    updateFeed = () => {
        this.setState({
            update: !this.state.update,
        });
    };

    render() {
        const { userLogged } = this.state;
        return (
            <Router>
                <div>
                    <NavbarComp afterUpload={this.updateFeed}/>
                </div>
                <div className="pl-5 pr-5">
                    { !(userLogged && userLogged.is_admin) &&
                        <div>
                            <Route path="/" exact render={(props) => <FeedComp {...props} update={this.state.update} /> } />
                            <Route path="/profile" exact component={ProfileComp} />
                        </div>
                    }
                    { userLogged && userLogged.is_admin &&
                        <Route path="/admin" exact component={AdminComp} />
                    }
                </div>
            </Router>
        );
    }
}
