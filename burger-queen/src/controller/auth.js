/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable consistent-return */
/* eslint-disable prefer-promise-reject-errors */

// Realiza una petición GET al endpoint "/users" para verificar si las credenciales del usuario son correctas
// Retorna una promesa que se resuelve con el objeto usuario si las credenciales son correctas
// o se rechaza con un mensaje de error si el email y password son requeridos
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


// Realiza una petición GET al endpoint "/users/{email}" para obtener la información del usuario con el correo electrónico proporcionado
// Retorna una promesa que se resuelve con el objeto usuario si el correo electrónico existe en la base de datos
// o se rechaza con un mensaje de error si el correo electrónico no se encuentra o hay algún problema de autenticación
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
