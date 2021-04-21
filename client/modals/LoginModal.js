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

const LoginModal = ({ user, setUser, isAuthenticated, setisAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);
  //const [name, setName] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const toggle = () => {
    setIsOpen(!isOpen);
    console.log('NAME', user);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const user = {
      username,
      password,
    };
    console.log('user', user);

    // ATTEMPT TO LOGIN
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('result successful in Login onSubmit', result);
        if (result.loggedIn === true) {
          console.log('login successful in Login onSubmit');
          setUser(result.name);
          setisAuthenticated(true);
        }
        else if (result.loggedIn === false) {
          alert('Failed Login Attempt')
        }
      })
      .catch((err) => console.log('err in Login onSubmit', err));

    setUsername('');
    setPassword('');
  };

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
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
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for='username'>Username</Label>
              <Input
                type='username'
                name='username' // SHOULD BE SAME AS IN STATE
                id='username'
                placeholder='Username'
                className='mb-3'
                value={username}
                onChange={onChangeUsername} // WILL UPDATE THE STATE PER EACH CHARACTER CHANGE
              />

              <Label for='password'>Password</Label>
              <Input
                type='password'
                name='password' // SHOULD BE SAME AS IN STATE
                id='password'
                placeholder='Password'
                className='mb-3'
                value={password}
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
