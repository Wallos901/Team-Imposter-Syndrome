import React from 'react';

export default class Comments extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Comments</h1>
                <div>i love orangutans</div>
                <div>this photo is more beautiful than my mother</div>
                <div>please end my life</div>
            </div>
        );
    }
}