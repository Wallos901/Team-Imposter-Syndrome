import React from 'react';
import {ModalHeader, ModalBody} from 'reactstrap';

export default class LeaderboardModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ModalHeader>Leaderboard</ModalHeader>
                <ModalBody>
                    <p>1. medi is number 1</p>
                    <p>2. ben is okay i guess</p>
                    <p>9999. josh is a Loser</p>
                </ModalBody>
            </div>
        );
    }
}