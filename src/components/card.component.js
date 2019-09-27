import React from "react";
import {Card} from "reactstrap";

import ModalComp from "./modal.component";

export default class CardComp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    render() {
        return (
            <Card style={{alignItems: 'center'}}>
                <ModalComp
                    imageUrl={this.props.imageUrl} type="post" title="Image Here" userId={this.props.userId} postId={this.props.postId}
                />
            </Card>
        );
    }
}
