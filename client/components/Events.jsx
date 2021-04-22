import React, { Component, useState, useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import LoginModal from '../modals/LoginModal';

const Events = ({ user, setUser, userId, isAuthenticated }) => {
  const [eventsList, setEventsList] = useState([]);

  useEffect(() => {
    console.log('Events useEfect', userId);
    fetch('/api/allevents')
      .then((res) => res.json())
      .then((results) => {
        setEventsList(results);
        console.log('get events fetch', results);
      });
  }, []); //only if user is updated

  const subscribe = (id) => {
    console.log('id from within events', userId);
    console.log('subscribe', id);
    fetch('api/subs', {
      method: 'POST',
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
        console.log('add sub fetch', results);
      });
    //alert if no spots remaining
  };
  return (
    <Container style={{paddingTop:'20px'}}>
      <ListGroup>
        <TransitionGroup className='all-events-list'>
          <h2>All Events</h2>
          {eventsList.map(({ id, meal, date, slotsLeft, discription }) => (
            <CSSTransition key={id} timeout={500} classNames='fade'>
              <ListGroupItem>
                {isAuthenticated ? (
                  <Button
                    style={{ position: 'absolute', right: '5px', top: '30%' }}
                    className='add-btn'
                    color='primary'
                    size='sm'
                    onClick={() => subscribe(id)}
                  >
                    Add to Schedual
                  </Button>
                ) : (
                  <button
                    style={{ position: 'absolute', right: '5px', top: '30%' }}
                    className='add-btn'
                    color='primary'
                    size='0'
                  >
                    <LoginModal />
                  </button>
                )}
                <div
                  style={{ position: 'absolute', right: '135px', top: '35%' }}
                >
                  {date}
                </div>
                <h4 style={{ position: 'relative' }}>{meal}</h4>
                <div style={{ position: 'relative' }}>
                  Spots Remaining: {slotsLeft}
                </div>
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

export default Events;
