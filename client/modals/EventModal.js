import React, {useState, useEffect, Fragment} from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { enUS } from 'date-fns/locale'
import { DatePicker } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'

// Custom hook for handling input boxes
// saves us from creating onChange handlers for them individually
const useInput = init => {
  const [ value, setValue ] = useState(init);
  const onChange = e => {
    setValue(e.target.value);
  };
  // return the value with the onChange function instead of setValue function
  return [ value, onChange ];
};


function getFormattedDate(date) {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');

  return month + '/' + day + '/' + year;
}

const EventModal = () => {

  const [ meal, mealOnChange ] = useInput('');
  const [ description, descriptionOnChange ] = useInput('');
  const [ slots, slotsOnChange ] = useInput('');
  const [date, setDate] = useState()

  const [modal, setModal] = useState(false)
  
  const toggle = () => {
    setModal(!modal)
  }

  const onSubmit = e => {
    e.preventDefault();

    // const newEvent = {
    //   meal: meal,
    //   description: description,
    //   date: getFormattedDate(date)
    // }
  
  const chefID = document.cookie.substr(document.cookie.indexOf('=') + 1)
  const body = { name: meal, description: description, chefID: chefID}

console.log(33333, body)

  // CREATE A MEAL FIRST
  fetch('/api/meals', {
    method: 'POST',
    headers: { 'Content-Type' : 'Application/JSON'},
    body: JSON.stringify(body)    
  })
  .then(resp => {
    return resp.json().then(json => ({ data: json, status: resp.status }))
  })
  .then(res => {

console.log(44444, res)

    if (res.status === 200) {
      
      const event = { date: getFormattedDate(date), mealID: res.data.mealID, slots: slots }
      // INSERT NEW EVENT!
      fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type' : 'Application/JSON'},
        body: JSON.stringify(event)    
      })
      .then(resp => {
        return resp.json().then(json => ({ data: json, status: resp.status }))
      })
      .then(res => {
console.log(55555, res)
        if (res.status === 200){
          toggle();
          window.location.reload();
        }
      })
    }
  })
}

    return (
      <div>

        <Button
          color="dark"
          style={{marginBottom: '2rem'}}
          onClick={toggle}
        >Create Event</Button>
        
        <Modal isOpen={modal} toggle={toggle} >
          <ModalHeader toggle={toggle}>Create a Meal Event!</ModalHeader>
          <ModalBody>
            <Form onSubmit={onSubmit}>
              <FormGroup>
                <Label for="meal">Meal</Label>
                <Input 
                  type="text"
                  name="meal"
                  id="meal"
                  placeholder="What are you cooking up?"
                  onChange={mealOnChange}
                />
                <Label for="meal">Description</Label>
                <Input 
                  type="description"
                  name="description"
                  id="description"
                  placeholder="Tell us about this tasty meal!"
                  onChange={descriptionOnChange}
                />
                <Label for="meal">Date</Label>
                <DatePicker date={date} onDateChange={setDate} locale={enUS}>
                  {({ inputProps, focused }) => (
                    <input
                      className={'input' + (focused ? ' -focused' : '')}
                      {...inputProps}
                    />
                  )}
                </DatePicker>
                <Label for="slots">Slots</Label>
                <Input 
                  type="number"
                  pattern="[0-9]*"
                  name="slots"
                  id="slots"
                  placeholder="How many meals will be available?"
                  onChange={slotsOnChange}
                />
                <Button
                  color="dark"
                  style={{marginTop: '2rem'}}
                  block
                >Create Event</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  
}

export default EventModal;