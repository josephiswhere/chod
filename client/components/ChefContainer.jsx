import React, {useState, useEffect, Fragment} from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function getFormattedDate(date) {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');

  return month + '/' + day + '/' + year;
}

export default function ChefContainer() {

  const [events, setEvents] = useState([]);
  
  const userid = document.cookie; 
  useEffect(() => {
    fetch('/api/events', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(resp => {
      return resp.json().then(json => ({ data: json, status: resp.status }))
    })
    .then(res => {

console.log(44444, res)

      if (res.status === 200) {
        setEvents(res.data)
      }
    })
  }, []);

  const onDeleteClick =(id) => {
    //this.props.deleteItem(id);
  }

    return (
      <Container>
          <ListGroup horizontal>
            <TransitionGroup className="event-list">
              {events.map(({ _id, date, meal, description }) => (
                <CSSTransition key={_id} timeout={500} classNames="fade">
                  <ListGroupItem>
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={onDeleteClick.bind(this, _id)}
                    >&times;</Button>                 
                    
                    <div>{getFormattedDate(new Date(date.replace(' ', 'T')))}</div>
                    <div>{meal}</div> 
                    <div>{description}</div> 
                  </ListGroupItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ListGroup>
      </Container>
    );
}