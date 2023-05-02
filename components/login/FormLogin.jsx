import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { postAuth, getUserByEmail } from '../../burger-queen/src/controller/auth';

const FormLogin = () => {
  // Obtenemos el historial de navegación con useHistory
  const history = useHistory();

  // Creamos dos estados, 'currentUser' y 'error', ambos utilizando useState
  const [currentUser, setCurrentUser] = useState({
    currentEmail: '',
    currentPassword: '',
  });

  const [error, setError] = useState({
    email: false,
    password: false,
    message: '',
  });

  // Creamos una función llamada handleChangeUser que se ejecuta cuando cambia el contenido de los inputs
  const handleChangeUser = (e) => {
  // Actualizamos el estado 'currentUser' con el valor actual de los inputs
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };

  // Creamos una función llamada handleGetLogin que se ejecuta cuando se presiona el botón "Log In"
  const handleGetLogin = () => {
    // Obtenemos el valor actual del email y la contraseña del estado 'currentUser'
    const email = currentUser.currentEmail;
    const password = currentUser.currentPassword;

    // Verificamos si el email y la contraseña no son válidos
    // const exRegEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    const notValidEmail = email.trim() === '';
    const notValidPassword = password.trim() === '';

    // Si no son válidos, actualizamos el estado 'error' correspondiente
    if (notValidEmail || notValidPassword) {
      if (notValidEmail) setError((prevState) => ({ ...prevState, email: true }));
      else setError((prevState) => ({ ...prevState, email: false }));
      if (notValidPassword) setError((prevState) => ({ ...prevState, password: true }));
      else setError((prevState) => ({ ...prevState, password: false }));
    } else {
        // Si son válidos, realizamos una petición POST al endpoint '/users' con el email y la contraseña
      postAuth({ email, password }).then((resp) => {
        console.log(resp)
        // Buscamos el usuario correspondiente al email en la respuesta del servidor
        const user = resp.find((user) => user.email === email);
        // Si no encontramos el usuario o la contraseña es incorrecta, actualizamos el estado 'error' correspondiente
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

        // Si ocurre un error durante la petición, actualizamos el estado 'error' con el mensaje de error correspondiente

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

