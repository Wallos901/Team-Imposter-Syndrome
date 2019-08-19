import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class PostModalComp extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
          PostModalComp: false
        };
    
        this.togglePostModalComp = this.togglePostModalComp.bind(this);
      }
    
    togglePostModalComp() {
        this.setState(prevState => ({
            PostModalComp: !prevState.PostModalComp
        }));
      }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.PostModalComp} toggle={this.togglePostModalComp}>
          <ModalHeader>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}