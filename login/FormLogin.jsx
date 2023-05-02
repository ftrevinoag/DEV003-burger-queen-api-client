import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { postAuth, getUserByEmail } from '../../controller/auth';

const FormLogin = () => {
  const history = useHistory();

  const [currentUser, setCurrentUser] = useState({
    currentEmail: '',
    currentPassword: '',
  });

  const [error, setError] = useState({
    email: false,
    password: false,
    message: '',
  });

  const handleChangeUser = (e) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };

  const handleGetLogin = () => {
    const email = currentUser.currentEmail;
    const password = currentUser.currentPassword;

    // const exRegEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    const notValidEmail = email.trim() === '';
    const notValidPassword = password.trim() === '';

    if (notValidEmail || notValidPassword) {
      if (notValidEmail) setError((prevState) => ({ ...prevState, email: true }));
      else setError((prevState) => ({ ...prevState, email: false }));
      if (notValidPassword) setError((prevState) => ({ ...prevState, password: true }));
      else setError((prevState) => ({ ...prevState, password: false }));
    } else {
      postAuth({ email, password }).then((resp) => {
        console.log(resp)
        const user = resp.find((user) => user.email === email);
        if (user && user.password === password) {
          sessionStorage.setItem('currentRol', user.roles.admin);
          sessionStorage.setItem('currentEmail', user.email);
          history.push('/categories')
        }
        else{
          setError((prevState) => ({ ...prevState, message: 'El usuario no existe' }));
        }
        // sessionStorage.setItem('token', resp.token);
        // getUserByEmail(email).then((user) => {
        //   sessionStorage.setItem('currentRol', user.roles.admin);
        //   sessionStorage.setItem('currentEmail', user.email);
        //   history.push('/categories');
        // });
      }).catch((err) => {
        setError((prevState) => ({ ...prevState, message: err }));
      });
    }
  };

  return (
    <form className="login-form">
      <p>Let's get you loged-in</p>
      <div className={error.email ? 'box-user box-error' : 'box-user'}>
        <i className="user-icon fas fa-user" />
        <input
          defaultValue={currentUser.currentEmail}
          // id="email"
          name="currentEmail"
          type="email"
          onChange={handleChangeUser}
          placeholder={error.email ? 'Required' : 'hello@greatsite.com'}
          className={error.email ? 'user errors' : 'user'}
        />
      </div>
      <div className={error.password ? 'box-user box-error' : 'box-user'}>
        <i className="user-icon fas fa-lock" />
        <input
          defaultValue={currentUser.currentPassword}
          // id="password"
          name="currentPassword"
          type="password"
          onChange={handleChangeUser}
          placeholder={error.password ? 'Required' : '***********'}
          className={error.password ? 'user errors' : 'user'}
        />
      </div>
      { error.message && <span>{error.message}</span> }
      <button type="button" className="btn-login" onClick={handleGetLogin}>Log In</button>
    </form>
  );
};

export default FormLogin;

