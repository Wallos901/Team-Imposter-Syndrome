import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import ModalComp from "./modal.component";

export default class NavbarComp extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">Picture This!</NavbarBrand>
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <ModalComp type={'upload'} text={'Upload'}/>
                        </NavItem>
                        <NavItem>
                            <NavLink>Leaderboard</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                {/* TODO: Make this dynamically update based on logged in user's username */}
                                Profile
                            </DropdownToggle>
                            <DropdownMenu right>
                                <ModalComp type={'profile'} text={'View Profile'}/>
                                <ModalComp type={'settings'} text={'Settings'}/>
                                <DropdownItem divider/>
                                <DropdownItem>
                                    Reset
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}