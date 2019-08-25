import React from "react";
import {Card} from "reactstrap";

import ModalComp from "./modal.component";

export default class CardComp extends React.Component {
    render() {
        return (
            <div>
                <Card>
                    <ModalComp
                        imageUrl="https://knowpathology.com.au/app/uploads/2018/07/Happy-Test-Screen-01-825x510.png" type="post" title="Image Here"
                    />
                    <ModalComp
                        imageUrl="https://www.windowscentral.com/sites/wpcentral.com/files/styles/w830/public/field/image/2016/06/xpbliss_7.jpg?itok=RDRuJObj" type="post" title="Image Here"
                    />
                    <ModalComp
                        imageUrl="https://media.giphy.com/media/20Fh43rnYhBV6/giphy.gif" type="post" title="Image Here"
                    />
                    <ModalComp
                        imageUrl="https://i.ebayimg.com/images/g/YxgAAOSwZupcFmgS/s-l300.jpg" type="post" title="Image Here"
                    />
                </Card>
            </div>
        );
    }
}
