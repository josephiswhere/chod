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
    console.log(88888, id)
  }

  return (

    <Container>
      <div>  
          {events.map(({ _id, date, meal, description }) => (
            
            <ListGroup horizontal>
              <ListGroupItem style={{width: 50 + 'px'}}>
                <Button
                  className="remove-btn"
                  color="danger"
                  size="sm"
                  onClick={onDeleteClick.bind(this, _id)}
                  >&times;</Button>                 
              </ListGroupItem>
              <ListGroupItem style={{width: 125 + 'px'}}>
                {getFormattedDate(new Date(date.replace(' ', 'T')))}
              </ListGroupItem>
              <ListGroupItem style={{width: 500 + 'px'}}>
                {meal}
              </ListGroupItem>
              <ListGroupItem style={{width: 700 + 'px'}}>
                {description}
              </ListGroupItem>
            </ListGroup>
            
          ))}

      </div> 
    </Container>

  );
}
