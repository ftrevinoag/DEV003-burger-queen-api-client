/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { postUser, putUser } from '../../../controller/admin-users';

const FormUsers = ({ state, setState }) => {
  const [error, setError] = useState({
    email: false,
    password: false,
    api: '',
  });

  const handleInputChange = (e) => {
    const input = e.target.name;
    const data = e.target.value;
    setState((prevState) => ({
      ...prevState,
      userData: {
        ...state.userData,
        [input]: data,
      },
    }));
  };

  const handleSelectChange = (e) => {
    const select = e.target.value;
    setState((prevState) => ({
      ...prevState,
      userData: {
        ...state.userData,
        roles: { admin: select === 'SI' },
      },
    }));
  };

  const closeModal = () => {
    setError({ email: false, password: false, api: '' });
    setState((prevState) => ({
      ...prevState,
      userData: {
        _id: '',
        email: '',
        password: '',
        roles: { admin: false },
      },
      display: {
        ...state.userData,
        modal: false,
      },
    }));
    document.body.removeChild(document.getElementById('modal'));
  };

  const handleRequest = (request) => {
    const exRegEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    const validEmail = state.userData.email.trim() === '' || !exRegEmail.test(state.userData.email.trim());
    const validPassword = state.userData.password.trim() === '' || state.userData.password.trim().length < 6;

    if (validEmail || validPassword) {
      if (validEmail) setError((prevState) => ({ ...prevState, email: true }));
      else setError((prevState) => ({ ...prevState, email: false }));
      if (validPassword) setError((prevState) => ({ ...prevState, password: true }));
      else setError((prevState) => ({ ...prevState, password: false }));
    } else if (request === 'POST') {
      postUser(state.userData).then((resp) => {
        setState((prevState) => ({
          ...prevState,
          allUsers: [...state.allUsers, resp],
        }));
        closeModal();
      }).catch((err) => {
        setError(err);
      });
    } else {
      const id = state.userData._id;
      const userObj = {
        email: state.userData.email,
        password: state.userData.password,
      };
      putUser(userObj, id).then((resp) => {
        setState((prevState) => ({
          ...prevState,
          allUsers: state.allUsers.map((user) => (user._id === resp._id ? resp : user)),
        }));
        closeModal();
      }).catch((err) => {
        setError(err);
      });
    }
  };

  return (
    <form className="form-modal">
      <div className="form-container">
        <div>
          <label htmlFor="input-email" className="label-text">E-MAIL:</label>
          <div className="box-input">
            <input
              defaultValue={state.userData.email}
              data-testid="email"
              id="input-email"
              name="email"
              type="email"
              onChange={handleInputChange}
              placeholder={error.email ? 'Campo requerido' : 'Ingrese el email'}
              className={error.email ? 'input-modal error' : 'input-modal'}
            />
          </div>
        </div>
        <div>
          <label htmlFor="input-password" className="label-text">CLAVE:</label>
          <div className="box-input">
            <input
              defaultValue={state.userData.password}
              id="input-password"
              name="password"
              type="password"
              onChange={handleInputChange}
              placeholder={error.password ? 'Campo requerido' : 'Ingrese el password'}
              className={error.password ? 'input-modal error' : 'input-modal'}
            />
          </div>
        </div>
        <div>
          <label htmlFor="input-admin" className="label-text">ADMIN:</label>
          <div className="box-option">
            <select id="input-admin" onChange={handleSelectChange} className="select-modal" defaultValue={state.userData.roles.admin ? 'SI' : 'NO'}>
              <option value="NO">NO</option>
              <option value="SI">SI</option>
            </select>
          </div>
        </div>
        {error.message !== '' && <span>{error.message}</span>}
        <div>
          <button type="button" className="btn-modal cancel" onClick={closeModal}>Cancelar</button>
          {state.display.btnEdit ? (
            <button type="button" className="btn-modal save" onClick={() => handleRequest('PUT')}>Editar</button>
          ) : (
            <button type="button" className="btn-modal save" onClick={() => handleRequest('POST')}>Guardar</button>
          )}
        </div>
      </div>
    </form>
  );
};

export default FormUsers;