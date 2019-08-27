import React from 'react';
import {Media} from "reactstrap";

export default class Responses extends React.Component {
    render() {
        return (
            <div>
                <hr/>
                <h3>Responses</h3>
                <hr/>
                <Media list>
                    <Media tag="li">
                        <Media body>
                            Image 1
                            <Media>
                                <Media left>
                                    <Media object data-src="" alt="-------------"/>
                                </Media>
                                <Media body>
                                    Image 1.1
                                </Media>
                            </Media>
                        </Media>
                        <Media body>
                            Image 2
                            <Media>
                                <Media left>
                                    <Media object data-src="" alt="-------------"/>
                                </Media>
                                <Media body>
                                    Image 2.1
                                </Media>
                            </Media>
                        </Media>
                    </Media>
                </Media>
            </div>
        );
    }
}