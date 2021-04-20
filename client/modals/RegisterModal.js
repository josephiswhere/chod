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
  
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
      setIsOpen(!isOpen)
    }
  
  return (
    <div>
      <NavLink onClick={toggle} href="#">
          Register
      </NavLink>

      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
      </Modal>
      
    </div>
  );
};

export default RegisterModal;
