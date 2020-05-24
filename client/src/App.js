import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { GlobalProvider } from './context/GlobalState'

import './styles/App.css';

import Account from './pages/Account';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Switch>
        <GlobalProvider>
          <Route path="/" exact component={Account} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
        </GlobalProvider>
      </Switch>
    </Router>
  );
}

export default App;
