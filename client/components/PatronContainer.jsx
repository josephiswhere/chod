import React from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import PatronHeader from './PatronHeader.jsx';
import Events from './Events.jsx';

const PatronContainer = ({
  user,
  userId,
  setUser,
  isAuthenticated,
  setisAuthenticated,
}) => {
  return (
    <Container>
      {isAuthenticated ? <PatronHeader user={user} userId={userId} isAuthenticated={isAuthenticated} /> : null}
      <Events user={user} setUser={setUser} userId={userId} isAuthenticated={isAuthenticated} />
    </Container>
  );
};

export default PatronContainer;
