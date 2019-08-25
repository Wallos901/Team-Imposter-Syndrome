import React from "react";
import {Card} from "reactstrap";

import ModalComp from "./modal.component";

export default class CardComp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Card>
                    <ModalComp
                        imageUrl={this.props.imageUrl} type="post" title="Image Here"
                    />
                </Card>
            </div>
        );
    }
}
