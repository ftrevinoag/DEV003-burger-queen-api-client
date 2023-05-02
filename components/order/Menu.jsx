import React, { useState, useEffect } from 'react';
import { getProducts } from '../../controller/admin-products';
import Header from '../../Header';
import ProductsMenu from './ProductsMenu';
import OrderList from './orderList';

const MenuView = () => {
  const [state, setState] = useState({
    allProducts: [],
    products: [],
    productsList: [],
  });

  // Carga inicial de productos
  useEffect(() => {
    getProducts().then((resp) => {
      setState((prevState) => ({ ...prevState, allProducts: resp, products: resp }));
    });
  }, []);

  return (
    <>
      <Header title="ORDERS" />
      <main className="container-orders">
        <ProductsMenu state={state} setState={setState} />
        <OrderList state={state} setState={setState} />
      </main>
    </>
  );
};

export default MenuView;
