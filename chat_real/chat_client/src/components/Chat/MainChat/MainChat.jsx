import React from 'react';
import socket from './chatSocket.js'
import ChatHeader from './ChatHeader/ChatHeader'
import ChatList from './ChatList/ChatList'
import ChatInput from './ChatInput/ChatInput'
import './MainChat.css'

const MainChat = (props) => {
  return (
  	<div className="chat-wrapper">
      <ChatHeader user={props.match.params.login}/>
      <ChatList socket={socket} user={props.match.params.login}/>
      <ChatInput socket={socket} user={props.match.params.login}/>
    </div>
  );
}

export default MainChat;