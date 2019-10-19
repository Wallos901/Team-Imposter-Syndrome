import React from 'react';
import {Spinner} from "reactstrap";
import '../styling.css' ;

/** Loading Component
 * 
 * Displays a loading spinner.
 * Used by asynchronous components while waiting for API responses.
 */
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
