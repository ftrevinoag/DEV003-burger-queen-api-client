/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { postOrder } from '../../controller/order';

const OrderList = ({ state, setState }) => {

  // Definimos un estado local para el nombre del cliente, que se inicializa como una cadena vacía. 
  // También definimos un estado para manejar los errores de validación.
  const [clientName, setClientName] = useState('');
  const [error, setError] = useState(false);


  // Definimos una función que maneja el cambio de estado del nombre del cliente.
  const handleInputChange = (e) => {
    setClientName(e.target.value);
  };
  // Obteniendo el total del costo de la orden
  const total = state.productsList.reduce((acc, element) => (
    acc + (element.qty * element.product.price)), 0);

  
  // se definen tres funciones que manejan el aumento y la disminución de la cantidad de cada producto en la orden, 
  // así como la eliminación completa de un producto.
    const increase = (id) => {
    const arr = state.productsList.map((item) => {
      if (item.product._id === id) {
        item.qty += 1;
      }
      return item;
    });
    setState((prev) => ({
      ...prev,
      productsList: arr.flat(),
    }));
  };

  const decrease = (id) => {
    const arr = state.productsList.map((item) => {
      if (item.product._id === id) {
        if (item.qty > 1) item.qty -= 1;
      }
      return item;
    });
    setState((prev) => ({
      ...prev,
      productsList: arr.flat(),
    }));
  };

  const delProduct = (id) => {
    setState((prev) => ({
      ...prev,
      productsList: state.productsList.filter((item) => item.product._id !== id),
    }));
  };


  // definimos una función que maneja la cancelación de una orden en curso y restablece los estados a sus valores iniciales.
  const cancelOrder = () => {
    setState((prev) => ({ ...prev, productsList: [] }));
    setClientName('');
    setError(false);
  };

// definimos una función que maneja la creación de una nueva orden y envía los datos al servidor para su 
//procesamiento. Primero validamos si se proporcionó el nombre del cliente y si se agregaron productos a la orden. 
//Si es así, formateamos los datos de la orden y los enviamos al servidor. Si no, establecemos el estado de error en verdadero.

  const handlePost = () => {
    const name = clientName.trim() === '' || clientName.length < 2;
    if (!name && state.productsList.length > 0) {
      const arrProduct = state.productsList.map((item) => ({
        qty: item.qty,
        productId: item.product._id,
      }));
      const obj = {
        _id: 'id_003',
        client: clientName,
        products: arrProduct,
      };
      postOrder(obj).then((resp) => {
        console.log(resp);
      });
      cancelOrder();
    } else {
      setError(true);
    }
  };

  return (
    <aside className="orders-placed">
      <p className="title">ORDER SUMMARY</p>
      <div className="cliente">
        <p className="letter">CLIENT</p>
        <input value={clientName} className="name-client" placeholder="Client's name" onChange={handleInputChange} />
      </div>
      <section className="order-table">
        <ul className="head-order">
          <li className="qty">QTY</li>
          <li className="product-name">PRODUCT</li>
          <li className="product-price">PRICE</li>
          <li className="delete-product" />
        </ul>
        <div className="product-list-container">
          {
            state.productsList.length > 0
              ? state.productsList.map((element) => (
                <ul className="order-product" key={element.product._id}>
                  <li className="qty button-edit">
                    <label htmlFor="plus">
                      <i id="plus" className="option fas fa-plus-circle" onClick={() => increase(element.product._id)} role="button" tabIndex={0} />
                    </label>
                    {element.qty}
                    <i className="option fas fa-minus-circle" onClick={() => decrease(element.product._id)} role="button" tabIndex={0} />
                  </li>
                  <li className="product-name">{element.product.name}</li>
                  <li className="product-price">
                    $
                    {element.product.price}
                  </li>
                  <li className="delete-product"><i className="icon delete fas fa-trash-alt" onClick={() => delProduct(element.product._id)} role="button" tabIndex={0} /></li>
                </ul>
              )) : (
                <p>NO ADDED PRODUCTS</p>
              )
          }
        </div>
      </section>
      <div className="total">
        <p>TOTAL AMOUNT</p>
        <div>
          $
          {total}
        </div>
      </div>
      <div className="options-button">
        <button type="button" className="cancel" onClick={cancelOrder}>CANCEL</button>
        <button type="button" className="send-cook" onClick={handlePost}>SEND TO KICHEN</button>
      </div>
      { error && <p className="error-order">Should have added products or client's name</p> }
    </aside>
  );
};

export default OrderList;
