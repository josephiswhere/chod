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


const PatronHeader = ({ user, userId, isAuthenticated }) => {
  const [myEventsList, setMyEventsList] = useState([]);


  useEffect(() => {
    console.log('PatronHeader useEfect', userId);
    fetch('/api/subs')
      .then((res) => res.json())
      .then((results) => {
        setMyEventsList(results);
        console.log('get subs fetch', results);
      });
  }, []); //only if user is updated

  function getFormattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
  
    return month + '/' + day + '/' + year;
  }
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
      {myEventsList.length ? 
        <ListGroup style={{ display:'inline-block', overflowY:'scroll', position: 'relative', left: '10%', width: '60%' , maxHeight:'320px'}}>
          <h2>My Upcoming Events</h2>
          <TransitionGroup className='upcoming-events-list'>
            {myEventsList.map(({ subid, name, date, chef, discription }) => (
              <CSSTransition key={subid} timeout={500} classNames='fade'>
                <ListGroupItem>
                  <Button
                    style={{ position: 'absolute', right: '5px', top: '30%' }}
                    className='add-btn'
                    color='link'
                    text='danger'
                    size='sm'
                    onClick={() => unsubscribe(subid)}
                  >
                    Unsubscribe
                  </Button>
                  <h5 style={{ position: 'relative' }}>{name}</h5>
                  <div style={{ position: 'relative' }}>{getFormattedDate(new Date(date.replace(' ', 'T')))}</div>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      : null}
        
    </Container>
  );
};

export default PatronHeader;
