/* eslint-disable consistent-return */

// Este archivo exporta tres funciones que realizan peticiones HTTP para crear, obtener y actualizar órdenes en la base de datos.
// Todas las funciones reciben y devuelven datos en formato JSON.
// Se usa el token almacenado en sessionStorage para autenticar las peticiones en el header Authorization.
// En caso de errores de autenticación o de que los datos recibidos no sean los esperados, se devuelven errores para manejarlos en la capa superior.
// Cada función maneja los posibles errores de la respuesta de la petición HTTP a través de un switch en el que 
// se especifican los diferentes códigos de estado y los errores correspondientes a cada uno de ellos

export const postOrder = (order) => fetch('http://localhost:3000/orders', {
  method: 'POST',
  body: JSON.stringify(order),
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
}).then((resp) => {
  switch (resp.status) {
    case 200:
      return resp.json();
    case 400:
      return new Error('userId o productos son requeridos');
    case 401:
      return new Error('No hay cabecera de autenticación');
    default:
      break;
  }
});

export const getOrders = () => fetch('http://localhost:3000/orders', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
}).then((resp) => {
  switch (resp.status) {
    case 200:
      return resp.json();
    case 401:
      return new Error('No hay cabecera de autenticación');
    default:
      break;
  }
});

export const putOrder = (order, id) => fetch(`http://localhost:3000/orders/${id}`, {
  method: 'PUT',
  body: JSON.stringify(order),
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
}).then((resp) => {
  switch (resp.status) {
    case 200:
      return resp.json();
    case 400:
      return new Error('userId o productos son requeridos');
    case 401:
      return new Error('No hay cabecera de autenticación');
    case 404:
      return new Error('No se encuentra la orden con el ID solicitado');
    default:
      break;
  }
});
