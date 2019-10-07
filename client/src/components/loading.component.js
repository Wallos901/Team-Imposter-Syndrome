import React from 'react';
import {Spinner} from "reactstrap";
import '../styling.css' ;

export default class LoadingComp extends React.Component {
    render() {
        return (
            <div>
                <div className="loading-spinner-container">
                    <Spinner color={"dark"}/>
                </div>
            </div>
        );
    }
}
