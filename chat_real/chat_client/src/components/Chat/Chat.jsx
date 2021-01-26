import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './Chat.css';
import Nav from './Nav/Navigation';
import MainChat from './MainChat/MainChat';
import Talks from './Talks/Talks';

const Chat = (props) => {
	let user = props.match.params.login;
  return (
  	<div className="chat">
  		<Nav user={user}/>
  		<Switch>
  			<Route exact path="/chat/:login" component={MainChat} />
  			<Route path="/chat/:login/talks" component={Talks} />
  		</Switch>
    </div>
  );
}

export default Chat;