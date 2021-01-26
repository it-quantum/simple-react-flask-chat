import React from 'react';
import './DialogItem.css'

const DialogItem = (props) => {
  return (
  	<div className="chat-item-wrapper">
  		<p>#{props.user}</p>
      <div className="chat-item">
        {props.body}
      </div>
    </div>
  );
}

export default DialogItem;