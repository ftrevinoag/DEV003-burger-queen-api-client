/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { getOrders } from '../../controller/order';
import Header from '../Header';
import DeliverSection from './DeliverSection';

const OrderReady = () => {
  // Estado para almacenar los pedidos en estado de 'delivering'
  const [delivering, setDelivering] = useState([]);
  // Estado para almacenar los pedidos en estado de 'delivered'

  const [delivered, setDelivered] = useState([]);

  // Al montar el componente, se realiza una petición para obtener los pedidos
  useEffect(() => {
    getOrders().then((resp) => {
      // Se filtran los pedidos por estado
      resp.forEach((order) => {
        if (order.status === 'delivering') setDelivering((prev) => ([...prev, order]));
        else if (order.status === 'delivered') setDelivered((prev) => ([...prev, order]));
      });
    });
  }, []);

  return (
    <>
      <Header />
      <section className="container-orderReady">
        <DeliverSection
          arr={delivering}
          setDelivering={setDelivering}
          setDelivered={setDelivered}
          check={false}
        />
        <DeliverSection arr={delivered} check />
      </section>
    </>
  );
};

export default OrderReady;