import React, {useState, useEffect, Fragment} from 'react';
import RegisterModal from './modals/RegisterModal.js'
import LoginModal from './modals/LoginModal.js'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
  } from 'reactstrap';

const NavBar = ({user, setUser, isAuthenticated, setisAuthenticated}) => {
  // const [isOpen, setIsOpen] = useState(false)

  // const toggle = () => {
  //   setIsOpen(!isOpen)
  // }


  useEffect(() => {
    if(isAuthenticated === false) {
      //return option to login or register
    } else {
      //option to toggle between chef and patron
    }
  })

  const authLinks = (
    <Fragment>
      <NavItem>
        <span className="navbar-text mr-3">
          <strong>{ user ? `Welcome ${user}` : '' }</strong>
        </span>
      </NavItem>
      <NavItem>
        <h1>Logout</h1>
      </NavItem>
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </Fragment>
  )
  
//   const user = React.createContext(null)
//   const isAuthenticated = React.createContext(false)

//   function setUser() {
//       return useContext(user)
//   }

//   function setisAuthenticated() {
//     return useContext(isAuthenticated)
//   }
  
  //if logged in return user info, 
 
  return (
    <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">Home</NavbarBrand>
            {/* <NavbarToggler onClick={toggle} /> */}
            {/* <Collapse isOpen={isOpen} navbar> */}
            <Nav className="ml-auto" navbar>
              {isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Container>
        </Navbar>
      </div>
  );
};
export default NavBar;
