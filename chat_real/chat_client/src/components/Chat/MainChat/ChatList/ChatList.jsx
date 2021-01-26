import React, {useState, useEffect} from 'react';
import ChatItem from './ChatItem/ChatItem'
import './ChatList.css'

const ChatList = ({socket, ...props}) => {
  let [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.open();
    fetch("http://127.0.0.1:5000/chat", {
      'method': 'GET'
    }).then(response => response.json())
      .then(data => {
        setMessages([...data]);
      });
    socket.on("post response", (data) => {
      setMessages(m => [...m, data]);
    });
    return () => { 
      socket.removeAllListeners("post response");
      socket.disconnect();
    };
  }, [socket]);

  return (
  	<div className="chat-body">
  		<div className="chat-body-wrapper">
  			{messages.map((elem, i) => { 
          return <ChatItem key={i} user={elem.user} body={elem.body}/>
        })}
  		</div>
    </div>
  );
}

export default ChatList;