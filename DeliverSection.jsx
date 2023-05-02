/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { putOrder } from '../../controller/order';

const DeliverSection = ({
  arr, setDelivering, setDelivered, check,
}) => {
  // Si check es false es delivering si es true es delivered
  const totalPrice = (order) => order.reduce((acc, element) => (
    acc + (element.qty * element.product.price)), 0);

  const handleStatus = (order) => {
    if (!check) {
      const obj = {
        status: 'delivered',
      };
      putOrder(obj, order._id).then((resp) => console.log(resp));
      setDelivering(arr.filter((item) => item._id !== order._id));
      setDelivered((prev) => ([order, ...prev]));
    }
  };

  return (
    <div className="container-div">
      <div className="card-scroll">
        <div className="card-orders">
          <p className="title">{check ? 'DELIVERED ORDERS' : 'PENDING DELIVER ORDERS'}</p>
          { arr.length > 0
            ? arr.map((order) => (
              <div className="list-Order" key={order._id}>
                <div className="header-card-order">
                  <p>
                    Order N°
                    {' '}
                    {order._id.slice(order._id.length - 5)}
                    {' '}
                    |
                    {' '}
                    {order.client}
                  </p>
                  <i
                    className={check ? 'fas fa-check green' : 'fas fa-check'}
                    onClick={() => handleStatus(order)}
                    role="button"
                    tabIndex={0}
                  />
                </div>
                <table className="body-card-order">
                  <tbody>
                    { order.products.map((item) => (
                      <tr key={item.product._id}>
                        <td className="qty">{item.qty}</td>
                        <td>{item.product.name}</td>
                        <td className="price">
                          S/.
                          {' '}
                          {item.qty * item.product.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="foot-card-order">
                  <p>Tiempo: 15.05min</p>
                  <p className="total">
                    $
                    {totalPrice(order.products)}
                  </p>
                </div>
              </div>
            )) : (
              <p className="no-orders">{check ? 'NO DELIVERED ORDERS' : 'NO PENDING DELIVER ORDERS'}</p>
            )}
        </div>
      </div>
    </div>
  );
};

DeliverSection.propTypes = {
  arr: PropTypes.array.isRequired,
  // setDelivering: PropTypes.func,
  // setDelivered: PropTypes.func.isRequired,
  check: PropTypes.bool.isRequired,
};

export default DeliverSection;