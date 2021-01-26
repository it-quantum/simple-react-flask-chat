import React from 'react';
import './DialogHeader.css'

const DialogHeader = (props) => {
  return (
  	<div className="chat-header">
        #{props.room}
    </div>
  );
}

export default DialogHeader;