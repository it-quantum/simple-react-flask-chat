import React from 'react';
import './DialogInput.css'

const DialogInput = ({socket, ...props}) => {
	let message = React.createRef();
  const submit = async (event) => {
  	let data = {room: props.room, user: props.user, info: message.current.value};
  	socket.emit("post data", data);
  };

  return (
  	<div className="chat-input">
  		<div className="chat-input-wrapper">
  			<input type="text" placeholder="Введите текст сообщения" ref={message}/>
  			<button onClick={submit}>Отправить</button>
  		</div>
  	</div>
  );
}

export default DialogInput;