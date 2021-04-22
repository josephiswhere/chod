import React, {useState, useEffect, Fragment} from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';

const RegisterModal = () => {
  
  
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isChef, setIsChef] = useState(false)
  const [name, setName] = useState('')
  const [msg, setMsg] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const handleUserNameChange = e => {
    setUserName(e.target.value);
  };

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleIsChefChange = e => {
    e.persist();
    setIsChef(prevState => !prevState);
  };

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    // CREATE USER OBJECT
    const newUser = {
        username,
        password,
        email,
        isChef,
        name
    }

    let body = JSON.stringify(newUser);

console.log(99999, newUser)

    // ATTEMPT TO REGISTER
    fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type' : 'Application/JSON'},
    body: body    
    })
    .then(resp => {
      return resp.json().then(json => ({ data: json, status: resp.status }))
    })
    .then(res => {

console.log(44444, res)

      if (res.status === 200) {
        toggle();
      }
    })

  }

  return (
    <div>
      <NavLink onClick={toggle} href="#">
          Register
      </NavLink>

      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
            { msg ? <Alert color="danger">{msg}</Alert> : null}
            <Form onSubmit={onSubmit}>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input 
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  className="mb-3"
                  onChange={handleUserNameChange}  // WILL UPDATE THE STATE PER EACH CHARACTER CHANGE
                />

                <Label for="password">Password</Label>
                <Input 
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="mb-3"
                  onChange={handlePasswordChange}  // WILL UPDATE THE STATE PER EACH CHARACTER CHANGE
                />

                <Label for="email">Email</Label>
                <Input 
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="mb-3"
                  onChange={handleEmailChange}  // WILL UPDATE THE STATE PER EACH CHARACTER CHANGE
                />


                <Input 
                  type="checkbox"
                  name="chef"
                  id="chef"
                  placeholder="chef"
                  className="ml-0"
                  onChange={handleIsChefChange}  // WILL UPDATE THE STATE PER EACH CHARACTER CHANGE
                />
                <Label className="ml-4" for="chef">I am a chef</Label>

                <br/>
                
                <Label for="name">Name</Label>
                <Input 
                  type="text"
                  name="name"
                  id="name"
                  placeholder="name"
                  className="mb-3"
                  onChange={handleNameChange}  // WILL UPDATE THE STATE PER EACH CHARACTER CHANGE
                />

                <Button
                  color="dark"
                  style={{marginTop: '2rem'}}
                  block
                >Register</Button>
              </FormGroup>
            </Form>
          </ModalBody>
      </Modal>
      
    </div>
  );
};

export default RegisterModal;
