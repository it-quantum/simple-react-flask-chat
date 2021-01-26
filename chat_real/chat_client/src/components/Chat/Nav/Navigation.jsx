import React from 'react';
import {NavLink} from 'react-router-dom';
import logo from "./favicon.ico";
import './Nav.css'

const Nav = (props) => {
  return (
  	<div className="nav">
  		<div className="logo">
  			<img src={logo} alt="" />
  		</div>
  		<div className="menu">
  			<ul>
  				<li><NavLink to={`/chat/${props.user}`} className="link">Общий чат</NavLink></li>
  				<li><NavLink to={`/chat/${props.user}/talks`} className="link">Мои беседы</NavLink></li>
  			</ul>
  		</div>
    </div>
  );
}

export default Nav;