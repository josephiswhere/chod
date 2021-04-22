import React, { Component, useState, useEffect } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Container,
  ListGroup,
  ListGroupItem,
  Button,
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import LoginModal from '../modals/LoginModal';

const PatronHeader = ({ user, userId, isAuthenticated }) => {
  const [eventsList, setEventsList] = useState([]);

  useEffect(() => {
    console.log('Events useEfect', userId);
    fetch('/api/events')
      .then((res) => res.json())
      .then((results) => {
        setEventsList(results);
        console.log('get events fetch', results);
      });
  }, []); //only if user is updated

  const unsubscribe = (id) => {
    console.log('id from within patronHeader', userId);
    console.log('unsubscribe', id);
    fetch('api/subs', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: userId,
        eventID: id,
      }),
    })
      .then((res) => res.json())
      .then((results) => {
        console.log('delete sub fetch', results);
      });
    //alert if no spots remaining
  };
  return (
    <Container>
      <Card style={{ display:'inline-block', position: 'relative', left: '0%', maxWidth: '40%' }}>
        <CardImg top width="100%" src="http://placekitten.com/g/200/150" alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">{user}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
          <CardText>I love Indian food</CardText>
          <Button>edit</Button>
        </CardBody>
      </Card>
      <ListGroup style={{ display:'inline-block',position: 'relative', left: '10%', width: '60%' }}>
        <TransitionGroup className='upcoming-events-list'>
          <h2>My Upcoming Events</h2>
          {eventsList.map(({ id, meal, date, slotsLeft, discription }) => (
            <CSSTransition key={id} timeout={500} classNames='fade'>
              <ListGroupItem>
                <Button
                  style={{ position: 'absolute', right: '5px', top: '30%' }}
                  class='btn btn-outline-danger'
                  className='add-btn'
                  color='link'
                  text='danger'
                  size='sm'
                  onClick={() => unsubscribe(id)}
                >
                  Unsubscribe
                </Button>
                <h5 style={{ position: 'relative' }}>{meal}</h5>
                <div style={{ position: 'relative' }}>{date}</div>
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

export default PatronHeader;
