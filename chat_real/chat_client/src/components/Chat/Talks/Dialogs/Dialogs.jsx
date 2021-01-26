import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom'
import './Dialogs.css'
import logo from './toggle_but.png'

const Dialogs = ({socket, ...props}) => {
  let [isList, setList] = useState(false);
  let [dialogs, setDialogs] = useState([]);

  useEffect(() => {
    socket.open();
    fetch(`http://127.0.0.1:5000/dialogs?user=${props.user}`, {
      "method": "GET"
    }).then(response => response.json())
      .then(data => setDialogs([...data]));
    socket.on("post response", (data) => {
      setDialogs(d => [...d, data]);
    });
    return () => { 
      socket.removeAllListeners("post response");
      socket.disconnect();
    };
  }, [socket, props.user]);

  let refCompanion = React.createRef();

  const create = async () => {
    let companion = refCompanion.current.value;
    let room = `${props.user}#${companion}`;
    let data = {"room":room, "first_user":props.user, "second_user":companion};
    socket.emit("post data", data);
  };

  return (
  	<div className="dialogs-wrapper">
  	  <img src={logo} alt="" className="toogle" onClick={() => setList(!isList)}/>
      <div className={isList ? "input-show" : "input-hide"}>
      	<input type="text" placeholder="Введите собеседника" ref={refCompanion}/>
      	<button onClick={create}>Создать</button>
      </div>
      <div className="dialogs-list-wrapper">
  	   <div className={isList ? "list-show" : "list-hide"}>
      	<ul>
      		{dialogs.map((dialog, i) => {
            let encodedRoom = encodeURIComponent(dialog.room);
            return (
              <li key={i}>
                <NavLink className="dialog-link" to={`/chat/${props.user}/talks/${encodedRoom}`}>#{dialog.room}</NavLink>
              </li> 
            )
          })}
      	</ul>
       </div>
      </div>
    </div>
  );
}

export default Dialogs;