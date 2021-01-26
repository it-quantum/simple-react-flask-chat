import React from 'react';
import './ChatItem.css'

const ChatItem = (props) => {
  return (
  	<div className="chat-item-wrapper">
  		<p>#{props.user}</p>
      <div className="chat-item">
        {props.body}
      </div>
    </div>
  );
}

export default ChatItem;