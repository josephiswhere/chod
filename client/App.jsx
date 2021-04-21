import React, { Component, useState, useEffect } from 'react';
import { Route, Switch } from 'react-router';
// import Welcome from './components/Welcome.jsx';
import EventModal from './modals/EventModal' 
import ChefContainer from './components/ChefContainer.jsx';
import NavBar from './NavBar.jsx';
import { Container } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [user, setUser] = useState('test user');
  const [userType, setUserType] = useState('patron');
  const [isAuthenticated, setisAuthenticated] = useState(false);
  console.log('popppppp');
  return (
    <div className='router'>
      <NavBar
        user={user}
        isAuthenticated={isAuthenticated}
        setUser={setUser}
        setisAuthenticated={setisAuthenticated}
        userType={userType}
        setUserType={setUserType}
      />
      <main>
        {/* <Switch> */}
          {/* <Route exact path='/' component={() => <Welcome />} /> */}
          {/* <Route exact path='/patron' component={() => <PatronContainer/>}/>
          <Route exact path='/chef' component={() => <ChefContainer/>}/> */}
        {/* </Switch> */}
        <Switch>
         <Container>
          <EventModal />
          <ChefContainer />
         </Container>
        </Switch>
      </main>
    </div>
  );
};

export default App;
