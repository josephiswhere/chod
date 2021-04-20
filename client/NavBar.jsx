import React, {useState, useEffect} from 'react';
// import RegisterModal from './modals/RegisterModal'
// import LoginModal from './modals/LoginModal'

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

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [logedIn, setLoggedIn] = useState(false);
  //if logged in return user info, option to toggle between chef and patron
  //if not logged in, return option to login or register
  return (
    <div>
      <h1>Hello from Navbar</h1>
      {/* <RegisterModal />
      <LoginModal /> */}
      {/* <Logout /> */}
    </div>
  );
};
export default NavBar;
