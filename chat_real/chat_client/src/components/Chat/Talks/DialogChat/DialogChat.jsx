import React from 'react';
import socket from './dialogsSocket.js'
import DialogHeader from './DialogHeader/DialogHeader'
import DialogList from './DialogList/DialogList'
import DialogInput from './DialogInput/DialogInput'
import './DialogChat.css'

const DialogChat = (props) => {
  let room = decodeURIComponent(props.match.params.dialog);

  return (
  	<div className="talks-wrapper">
      <DialogHeader {...props} room={room}/>
      <DialogList {...props} socket={socket} room={room}/>
      <DialogInput {...props} socket={socket} room={room}/>
    </div>
  );
}

export default DialogChat;