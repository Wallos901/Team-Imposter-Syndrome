import React from 'react';

import '../styling.css' ;

import NavbarComp from "./navbar.component";
import {Spinner} from "reactstrap";

export default class LoadingComp extends React.Component {
    render() {
        return (
            <div>
                <NavbarComp/>

                <div className="loading-spinner-container">
                    <Spinner color={"dark"}/>
                </div>
            </div>
        );
    }
}
