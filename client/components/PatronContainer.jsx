import React from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import PatronHeader from './PatronHeader.jsx'
import Events from './Events.jsx'

const PatronContainer = ({ user, setUser, isAuthenticated, setisAuthenticated }) => {
  return (
    <Container>
      <PatronHeader/>
      <Events/>
    </Container>
  );
};

export default PatronContainer;