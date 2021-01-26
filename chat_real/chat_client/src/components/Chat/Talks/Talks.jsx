import React from 'react';
import socket from './talksSocket.js'
import {Route} from 'react-router-dom'
import './Talks.css'
import Dialogs from './Dialogs/Dialogs'
import DialogChat from './DialogChat/DialogChat'

const Talks = (props) => {
  return (
  	<div className="talks-body">
      <Dialogs socket={socket} user={props.match.params.login} />
      <Route exact path="/chat/:login/talks/:dialog" render={(props) => <DialogChat {...props} user={props.match.params.login}/>} />
    </div>
  );
}

export default Talks;