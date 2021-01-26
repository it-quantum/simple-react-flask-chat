import React, {useState, useEffect} from 'react';
import DialogItem from './DialogItem/DialogItem'
import './DialogList.css'

const DialogList = ({socket, ...props}) => {
  let [messages, setMessage] = useState([]);
  let room = encodeURIComponent(props.room);

  useEffect(() => {
    socket.open();
    socket.emit("join", {room:room});
    fetch(`http://127.0.0.1:5000/talks?room=${room}`, {
      'method': 'GET'
    }).then(response => response.json())
      .then(data => {
        setMessage([...data]);
      });
    socket.on("post response", (data) => {
      setMessage(m => [...m, data]);
    });
    return () => { 
      socket.emit("leave", {room});
      socket.removeAllListeners("post response");
      socket.disconnect();
    };
  }, [socket, room]);

  return (
  	<div className="chat-body">
  		<div className="chat-body-wrapper">
  			{messages.map((elem, i) => <DialogItem key={i} user={elem.user} body={elem.body}/>)}
  		</div>
    </div>
  );
}

export default DialogList;