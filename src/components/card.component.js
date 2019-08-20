import React from "react";
import {Card} from "reactstrap";

import PostModalComp from "./postModal.component";

export default class CardComp extends React.Component {
    render() {
        return (
            <div>
                <Card>
                    <PostModalComp
                        imageUrl="https://knowpathology.com.au/app/uploads/2018/07/Happy-Test-Screen-01-825x510.png"/>
                </Card>
            </div>
        );
    }
}