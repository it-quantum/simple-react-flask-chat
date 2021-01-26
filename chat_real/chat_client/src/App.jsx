import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import './App.css';
import Chat from './components/Chat/Chat'
import Register from './components/Register/Registration'
import Auth from './components/Auth/Authorization'

const App = (props) => {
  return (
    <div className="app-container">
      <Switch>
        <Redirect exact from="/" to="/auth" />
        <Route path="/chat/:login" component={Chat} />
        <Route path="/register" component={Register} />
        <Route path="/auth" component={Auth} />
      </Switch>
    </div>
  );
}

export default App;
