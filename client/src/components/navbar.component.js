import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavLink } from 'reactstrap';
import axios from 'axios';

import ModalComp from "./modal.component";

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
        axios.post("/api/users/logout")
            .then(res => {
                if (res.status === 200) {
                    localStorage.clear();
                    window.history.pushState({ url: "/" }, "home", "/");
                    window.location.reload();
                }
            });
    }

    render() {
        const { userLogged } = this.state;
        return (
            <Navbar color="dark" dark expand="md">
                { (!userLogged || (userLogged && !userLogged.is_admin)) &&
                    <NavbarBrand href="/">&#x1F5BC;&#x21A9; PictureThis</NavbarBrand>
                }
                { userLogged && userLogged.is_admin &&
                    <NavbarBrand href="/admin">PictureThis</NavbarBrand>
                }
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {userLogged && !userLogged.is_admin &&
                        <NavItem>
                            <NavLink href="/" >Home</NavLink>
                        </NavItem>
                        }
                        {userLogged && !userLogged.is_admin &&
                        <NavItem>
                            <ModalComp type={'upload'} text={'Upload'} upload={this.props.upload} afterUpload={this.props.afterUpload}/>
                        </NavItem>
                        }
                        { (!userLogged || (userLogged && !userLogged.is_admin)) &&
                        <NavItem>
                            <ModalComp type={'leaderboard'} text={'Leaderboard'}/>
                        </NavItem>
                        }
                        {userLogged && !userLogged.is_admin &&
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                {userLogged.username}
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem href={"/profile"}>
                                    View Profile
                                </DropdownItem>
                                <ModalComp type={'about'} text={'About'}/>
                                <DropdownItem divider/>
                                <DropdownItem onClick={this.logout}>
                                    Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        }
                        { userLogged && userLogged.is_admin &&
                        <NavItem onClick={this.logout} style={{ cursor: "pointer", color: "white" }}>
                            Logout
                        </NavItem>
                        }
                        {!userLogged &&
                        <NavItem>
                            <ModalComp type={'register'} text={'Register'}/>
                        </NavItem>
                        }
                        {!userLogged &&
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