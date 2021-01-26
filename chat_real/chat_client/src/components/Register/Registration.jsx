import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import './Register.css';

const Register = (props) => {
  let [isLogin, setLogin] = useState(false);
  let [isEmail, setEmail] = useState(false);
  let [isPass, setPass] = useState(false);
  let [isPasstwo, setPasstwo] = useState(false);
  let [isRegister, setRedirect] = useState(false);

  if (isRegister) {
    let user = document.cookie.split("=")[1];
    return <Redirect to={`/chat/${user}`} />
  }

  let loginRef = React.createRef();
  let passRef = React.createRef();
  let passtwoRef = React.createRef();
  let emailRef = React.createRef();

  const register = async (event) => {
    event.preventDefault();
    let login = loginRef.current.value;
    let email = emailRef.current.value;
    let pass = passRef.current.value;
    let passtwo = passtwoRef.current.value;
    let response = await fetch('http://127.0.0.1:5000/register', {
                               'method': 'POST',
                               'headers': {
                                  'Content-Type': 'application/json;charset=utf-8'
                                },
                               'body': JSON.stringify({login, email, pass, passtwo})
                             });
    let data = await response.json();
    if (data["login"] !== "") {
      document.cookie = `user=${data["login"]}`;
      setRedirect(true);
    } else {
      setLogin(data["isLogin"]);
      setEmail(data["isEmail"]);
      setPass(data["isPass"]);
      setPasstwo(data["isPasstwo"]);
    }
  }

  return (
  	<div className="reg-container">
  		<div className="reg">
        <div className="reg-wrapper">
  			 <h1>Регистрация</h1>
  			 <div className="reg-form">
  				<form onSubmit={register}>
  				  <label>Введите логин:</label>
  					<input type="text" placeholder="login" ref={loginRef} className={isLogin ? "is-invalid" : null}></input>
            { isLogin ? <span>Неверно введен логин</span> : null }
  				  <label>Введите почту:</label>
  				  <input type="email" placeholder="email" ref={emailRef} className={isEmail ? "is-invalid" : null}></input>
            { isEmail ? <span>Неверно введен email</span> : null }
  					<label>Введите пароль:</label>
  				  <input type="password" placeholder="password" ref={passRef} className={isPass ? "is-invalid" : null}></input>
            { isPass ? <span>Неверно введен пароль</span> : null }
  				  <label>Подтвердите пароль:</label>
  				  <input type="password" placeholder="password" ref={passtwoRef} className={isPasstwo ? "is-invalid" : null}></input>
            { isPasstwo ? <span>Неверно введен пароль</span> : null }
  				  <button type="submit" className="reg-button">Зарегистрироваться</button>
  				</form>
  			 </div>
        </div>
    	</div>
    </div>
  );
}

export default Register;