import React, { Component } from 'react';
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
    return (
        <div>
        <NavLink onClick={this.toggle} href="#">
            Register
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            { this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input 
                  type="text"
                  name="name" // SHOULD BE SAME AS IN STATE
                  id="name"
                  placeholder="Name"
                  className="mb-3"
                  onChange={this.onChange}  // WILL UPDATE THE STATE PER EACH CHARACTER CHANGE
                />

                <Label for="email">Email</Label>
                <Input 
                  type="email"
                  name="email" // SHOULD BE SAME AS IN STATE
                  id="email"
                  placeholder="Email"
                  className="mb-3"
                  onChange={this.onChange}  // WILL UPDATE THE STATE PER EACH CHARACTER CHANGE
                />

                <Label for="password">Password</Label>
                <Input 
                  type="password"
                  name="password" // SHOULD BE SAME AS IN STATE
                  id="password"
                  placeholder="Password"
                  className="mb-3"
                  onChange={this.onChange}  // WILL UPDATE THE STATE PER EACH CHARACTER CHANGE
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
  export default RegisterModal;const RegisterModal = () => {
    return (
        <div>
        <NavLink onClick={this.toggle} href="#">
            Register
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            { this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input 
                  type="text"
                  name="name" // SHOULD BE SAME AS IN STATE
                  id="name"
                  placeholder="Name"
                  className="mb-3"
                  onChange={this.onChange}  // WILL UPDATE THE STATE PER EACH CHARACTER CHANGE
                />

                <Label for="email">Email</Label>
                <Input 
                  type="email"
                  name="email" // SHOULD BE SAME AS IN STATE
                  id="email"
                  placeholder="Email"
                  className="mb-3"
                  onChange={this.onChange}  // WILL UPDATE THE STATE PER EACH CHARACTER CHANGE
                />

                <Label for="password">Password</Label>
                <Input 
                  type="password"
                  name="password" // SHOULD BE SAME AS IN STATE
                  id="password"
                  placeholder="Password"
                  className="mb-3"
                  onChange={this.onChange}  // WILL UPDATE THE STATE PER EACH CHARACTER CHANGE
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