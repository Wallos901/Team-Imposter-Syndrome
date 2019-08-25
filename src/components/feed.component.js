import React from "react";

import CardComp from "./card.component";

export default class FeedComp extends React.Component {
    render() {
        return (
            <div>
                <CardComp imageUrl="https://knowpathology.com.au/app/uploads/2018/07/Happy-Test-Screen-01-825x510.png"/>
                <CardComp imageUrl="https://www.windowscentral.com/sites/wpcentral.com/files/styles/w830/public/field/image/2016/06/xpbliss_7.jpg?itok=RDRuJObj"/>
                <CardComp imageUrl="https://media.giphy.com/media/20Fh43rnYhBV6/giphy.gif"/>
                <CardComp imageUrl="https://i.ebayimg.com/images/g/YxgAAOSwZupcFmgS/s-l300.jpg"/>
            </div>
        );
    }
}
