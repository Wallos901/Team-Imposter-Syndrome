import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem, NavLink
} from 'reactstrap';
import ModalComp from "./modal.component";
import axios from 'axios';
import {Link} from "react-router-dom";
import ProfileComp from "./profile.component";

export default class NavbarComp extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.logout = this.logout.bind(this);

        this.state = {
            isOpen: false,
            userLogged: localStorage.user ? JSON.parse(localStorage.user) : null
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    logout() {
        axios.post("http://localhost:5000/api/users/logout")
            .then(res => {
                if (res.status === 200) {
                    localStorage.clear();
                    window.location.reload();
                }
            });
    }

    render() {
        return (
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">PictureThis</NavbarBrand>
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {this.state.userLogged &&
                        <NavItem>
                            <NavLink href="/" >Home</NavLink>
                        </NavItem>
                        }
                        {this.state.userLogged &&
                        <NavItem>
                            <ModalComp type={'upload'} text={'Upload'} upload={this.props.upload} afterUpload={this.props.afterUpload}/>
                        </NavItem>
                        }
                        <NavItem>
                            <ModalComp type={'leaderboard'} text={'Leaderboard'}/>
                        </NavItem>
                        {this.state.userLogged &&
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                {this.state.userLogged.username}
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem href={"/profile"}>
                                    View Profile
                                </DropdownItem>
                                <ModalComp type={'settings'} text={'Settings'}/>
                                <DropdownItem divider/>
                                <DropdownItem onClick={this.logout}>
                                    Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        }
                        {!this.state.userLogged &&
                        <NavItem>
                            <ModalComp type={'register'} text={'Register'}/>
                        </NavItem>
                        }
                        {!this.state.userLogged &&
                        <NavItem>
                            <ModalComp type={'login'} text={'Login'}/>
                        </NavItem>
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}