import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Welcome from './components/Welcome.jsx'
import NavBar from './NavBar.jsx'


class App extends Component {
  render() {
    console.log('popppppp');
    return (
      <div className="router">
        <NavBar/>
        <main>
          <Switch>
           <Route exact path='/' component={() => <Welcome/>}/>
           {/* <Route exact path='/patron' component={() => <PatronContainer/>}/>
           <Route exact path='/chef' component={() => <ChefContainer/>}/> */}
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
