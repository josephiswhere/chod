import React, { Component, useState, useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Events = ({user, isAuthenticated}) => {
  const [eventsList, setEventsList] = useState([
    { id: 1, date: 'testDate', name: 'mealname', discription: 'blablabla', slotsLeft: '2' },
    { id: 2, date: 'test2Date', name: 'meal2name', discription: 'blablabla2', slotsLeft: '7' }
  ]);

  useEffect(() => {
    console.log('Events useEfect')
    //get request for events
  }, [eventsList]) //only if eventslist is updated

  const addEvent = (id) => {
    console.log('onDeleteClick', id);
    //Add Subscription
    //alert if no spots remaining
  };
  return (
    <Container>
      <ListGroup>
        <TransitionGroup className='shopping-list'>
          {eventsList.map(({ id, name, date, slotsLeft, discription }) => (
            <CSSTransition key={id} timeout={500} classNames='fade'>
              <ListGroupItem>
                <Button
                    style = {{position: 'absolute', right: '5px', top: '30%'}}
                    className='remove-btn'
                    color='primary'
                    size='sm'
                    onClick={() => addEvent(id)}
                    >
                    Add to Schedual
                </Button>
                <div style = {{position: 'absolute', right: '135px', top: '35%'}}>{date}</div>
                <h4 style = {{position: 'relative'}}>{name}</h4> 
                <div style = {{position: 'relative'}}>Spots Remaining: {slotsLeft}</div> 
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

export default Events;
