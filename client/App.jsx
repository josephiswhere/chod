import React, { Component, useState, useEffect } from 'react';
import { Route, Switch } from 'react-router';
import Welcome from './components/Welcome.jsx';
import PatronContainer from './components/PatronContainer.jsx';
import NavBar from './NavBar.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [user, setUser] = useState('test user');
  const [userType, setUserType] = useState('patron');
  const [isAuthenticated, setisAuthenticated] = useState(false);
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
        <Switch>
          <Route exact path='/' component={() => <Welcome />} />
          <Route
            exact
            path='/patron'
            component={() => (
              <PatronContainer
                user={user}
                isAuthenticated={isAuthenticated}
              />
            )}
          />
          {/* <Route exact path='/chef' component={() => <ChefContainer/>}/> */}
        </Switch>
      </main>
    </div>
  );
};

export default App;
