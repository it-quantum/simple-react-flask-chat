import React from 'react';
import './ChatHeader.css'

const ChatHeader = (props) => {
  return (
  	<div className="chat-header">
        #{props.user}
    </div>
  );
}

export default ChatHeader;