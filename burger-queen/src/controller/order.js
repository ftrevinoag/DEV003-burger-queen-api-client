/* eslint-disable consistent-return */

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
