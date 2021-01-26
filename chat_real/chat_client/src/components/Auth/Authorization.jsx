import React, {useState} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import './Auth.css';

const Auth = (props) => {
  let [isLogin, setLogin] = useState(false);
  let [isPass, setPass] = useState(false);
  let [isPasstwo, setPasstwo] = useState(false);
  let [isAuth, setRedirect] = useState(false);

  if (isAuth) {
    let user = document.cookie.split("=")[1];
    return <Redirect to={`/chat/${user}`} />
  }

  let loginRef = React.createRef();
  let passRef = React.createRef();
  let passtwoRef = React.createRef();

  const auth = async (event) => {
    event.preventDefault();
    let login = loginRef.current.value;
    let pass = passRef.current.value;
    let passtwo = passtwoRef.current.value;
    let response = await fetch('http://127.0.0.1:5000/auth', {
                               'method': 'POST',
                               'headers': {
                                  'Content-Type': 'application/json;charset=utf-8'
                                },
                               'body': JSON.stringify({login, pass, passtwo})
                             });
    let data = await response.json();
    if (data["login"] !== "") {
      document.cookie = `user=${data["login"]}`;
      setRedirect(true);
    } else {
      setLogin(data["isLogin"]);
      setPass(data["isPass"]);
      setPasstwo(data["isPasstwo"]);
    }
  }

  return (
  	<div className="auth-container">
  		<div className="auth">
        <div className="auth-wrapper">
  			 <h1>Авторизация</h1>
  			 <div className="auth-form">
  			   	<form onSubmit={auth}>
  			 		  <label>Введите логин:</label>
  				  	<input type="text" placeholder="login" ref={loginRef} className={isLogin ? "is-invalid" : null}></input>
              { isLogin ? <span>Неверно введен логин</span> : null }
  				  	<label>Введите пароль:</label>
  				  	<input type="password" placeholder="password" ref={passRef} className={isPass ? "is-invalid" : null}></input>
              { isPass ? <span>Неверно введен пароль</span> : null }
  				  	<label>Подтвердите пароль:</label>
  				  	<input type="password" placeholder="password" ref={passtwoRef} className={isPasstwo ? "is-invalid" : null}></input>
              { isPasstwo ? <span>Неверно введен пароль</span> : null }
  				  	<button type="submit" className="auth-button">Войти</button>
  				  	<NavLink to="/register">
  				  		<button className="auth-button">Регистрация</button>
  				  	</NavLink>
  				  </form>
  			 </div>
        </div>
    	</div>
    </div>
  );
}

export default Auth;