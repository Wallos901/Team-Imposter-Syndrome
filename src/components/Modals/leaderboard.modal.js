import React from 'react';
import {ModalHeader, ModalBody, Table} from 'reactstrap';

export default class LeaderboardModal extends React.Component {
    render() {
        return (
            <div>
                <ModalHeader>Leaderboard</ModalHeader>
                <ModalBody>
                    <Table striped={true} borderless={true} hover={true}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>josh-nairn</td>
                            <td>69</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Wallos901</td>
                            <td>50</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Medi</td>
                            <td>-69</td>
                        </tr>
                        </tbody>
                    </Table>
                </ModalBody>
            </div>
        );
    }
}