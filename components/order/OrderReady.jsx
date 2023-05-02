/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { getOrders } from '../../controller/order';
import Header from '../Header';
import DeliverSection from './DeliverSection';

const OrderReady = () => {
  const [delivering, setDelivering] = useState([]);
  const [delivered, setDelivered] = useState([]);

  useEffect(() => {
    getOrders().then((resp) => {
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