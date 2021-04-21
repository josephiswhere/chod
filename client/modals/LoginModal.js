import React, { useState, useEffect, Fragment } from 'react';
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
  Alert,
} from 'reactstrap';

const LoginModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    console.log('user', user)

    // ATTEMPT TO LOGIN
    fetch('/api/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .then((setName(user.name)))
    }

    )
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <NavLink onClick={toggle} href='#'>
        Login
      </NavLink>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          {msg ? <Alert color='danger'>{msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for='email'>Email</Label>
              <Input
                type='email'
                name='email' // SHOULD BE SAME AS IN STATE
                id='email'
                placeholder='Email'
                className='mb-3'
                onChange={onChangeEmail} // WILL UPDATE THE STATE PER EACH CHARACTER CHANGE
              />

              <Label for='password'>Password</Label>
              <Input
                type='password'
                name='password' // SHOULD BE SAME AS IN STATE
                id='password'
                placeholder='Password'
                className='mb-3'
                onChange={onChangePassword} // WILL UPDATE THE STATE PER EACH CHARACTER CHANGE
              />

              <Button color='dark' style={{ marginTop: '2rem' }} block>
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default LoginModal;
