import React from 'react';
import { ModalHeader, ModalBody } from 'reactstrap';

export default class AboutModal extends React.Component {
    render() {
        return (
            <div>
                <ModalHeader toggle={this.props.closeModal}>About</ModalHeader>
                <ModalBody>
                    <b>Picture This™</b>
                    <p>Created by Ben Walton, Maddie Mackey and Josh Nairn</p>

                    <p>Assessment 3 project
                    <br/>Advanced Internet Programming
                    <br/>Spring 2019</p>    

                    <p>Built using React
                    <br/>Other technologies include: Node.js, MongoDB, Heroku, Amazon S3, Reactstrap, react-masonry-css</p>            
                </ModalBody>
            </div>
        );
    }
}