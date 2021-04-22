import React from 'react';
import Typed from 'react-typed';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';

const Welcome = () => {
  return (
    <Container className="themed-container">
      <Typed 
          style={{fontSize:'60px', textAlign:'center'}}     
          className="header"
          strings={['CheftastiQL']}
          typeSpeed={500}
        />
      <br/>
    </Container>
  );
};

export default Welcome;
