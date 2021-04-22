import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import RegisterModal from './modals/RegisterModal.js';
import LoginModal from './modals/LoginModal.js';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink as SmallBrand,
  Container,
} from 'reactstrap';

const NavBar = ({ user, setUser, isAuthenticated, setisAuthenticated, userId, setUserId }) => {
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
        <SmallBrand onClick={onLogout}>Logout</SmallBrand>
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
          userId={userId}
          setUserId={setUserId}
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
          <NavLink exact to='/' activeStyle={{ fontWeight: 'bold' }}>
            <NavbarBrand> Home </NavbarBrand>
          </NavLink>
          <NavLink to='/patron' activeStyle={{ fontWeight: 'bold' }}>
            <NavbarBrand> Patron Portal </NavbarBrand>
          </NavLink>
          <NavLink to='/chef' activeStyle={{ fontWeight: 'bold' }}>
            <NavbarBrand> Chef Portal </NavbarBrand>
          </NavLink>
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
