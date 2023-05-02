/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable consistent-return */
/* eslint-disable prefer-promise-reject-errors */
export const postAuth = (user) =>
  fetch('http://localhost:3000/users', {
    method: 'GET',
    // body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((resp) => {
    console.log(resp)
    if (resp.status === 200) {
      return resp.json();
    } if (resp.status === 400) {
      return Promise.reject('El email y password son requeridos');
    }
    // return (resp);
  });

export const getUserByEmail = (email) =>
   fetch(`http://localhost:3000/users/${email}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  }).then((resp) => {
    if (resp.status === 200) {
      return resp.json();
    } if (resp.status === 400) {
      return Promise.reject('Usuario no encontrado');
    }
  });
