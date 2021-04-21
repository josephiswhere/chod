import React, { useState, useEffect, Fragment } from 'react';
import RegisterModal from './modals/RegisterModal.js';
import LoginModal from './modals/LoginModal.js';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from 'reactstrap';

const NavBar = ({ user, setUser, isAuthenticated, setisAuthenticated }) => {
  // const [isOpen, setIsOpen] = useState(false)

  // const toggle = () => {
  //   setIsOpen(!isOpen)
  // }

  useEffect(() => {
    if (isAuthenticated === false) {
      //return option to login or register
    } else {
      //option to toggle between chef and patron
    }
  });

  const onLogout = () => {
    setUser(null);
    setisAuthenticated(false);
  };

  const authLinks = (
    <Fragment>
      <NavItem>
        <span className='navbar-text mr-3'>
          <strong>{user ? `Welcome ${user}` : ''}</strong>
        </span>
      </NavItem>
      <NavItem>
        <NavLink onClick={onLogout}>Logout</NavLink>
      </NavItem>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal
          user={user}
          setUser={setUser}
          isAuthenticated={isAuthenticated}
          setisAuthenticated={setisAuthenticated}
        />
      </NavItem>
    </Fragment>
  );

  return (
    <div>
      <Navbar color='dark' dark expand='sm' className='mb-5'>
        <Container>
          {window.location.pathname === '/' ? (
            <NavbarBrand className='font-weight-bold' href='/'>
              Home
            </NavbarBrand>
          ) : (
            <NavbarBrand href='/'> Home </NavbarBrand>
          )};
          {window.location.pathname === '/chef' ? (
            <NavbarBrand className='font-weight-bold' href='/chef'>
              Chef Portal
            </NavbarBrand>
          ) : (
            <NavbarBrand href='/chef'> Chef Portal </NavbarBrand>
          )};
          {window.location.pathname === '/patron' ? (
            <NavbarBrand className='font-weight-bold' href='/patron'>
              Patron Portal
            </NavbarBrand>
          ) : (
            <NavbarBrand href='/patron'> Patron Portal </NavbarBrand>
          )}
          {/* <NavbarToggler onClick={toggle} /> */}
          {/* <Collapse isOpen={isOpen} navbar> */}
          <Nav className='ml-auto' navbar>
            {isAuthenticated ? authLinks : guestLinks}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};
export default NavBar;
