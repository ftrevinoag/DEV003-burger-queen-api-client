/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const ProductsMenu = ({ state, setState }) => {
  const [display, setDisplay] = useState({
    btnMenu: 'all',
    btnType: false,
  });
  const handleType = (type) => {
    switch (type) {
      case 'menu':
        setState((prev) => ({ ...prev, products: state.allProducts.filter((product) => product.type !== 'breakfast') }));
        setDisplay({ btnMenu: type, btnType: true });
        break;
      // case 'all':
      //     setProducts(allProducts);
      //     setDisplay({btnMenu: type, btnType: false});
      //   break;
      case 'breakfast':
        setState((prev) => (
          { ...prev, products: state.allProducts.filter((product) => product.type === type) }));
        setDisplay({ btnMenu: type, btnType: false });
        break;
      default:
        setState((prev) => (
          { ...prev, products: state.allProducts.filter((product) => product.type === type) }));
        break;
    }
  };

  const addProduct = (item) => {
    // Hay que buscar si ya está en el array de la orden
    const result = state.productsList.find((element) => element.product._id === item._id);

    if (!result) {
      setState((prev) => ({
        ...prev,
        productsList: [...state.productsList, { qty: 1, product: item }],
      }));
    }
  };

  return (
    <section className="products-options">
      <div className="options-type">
        <button type="button" onClick={() => handleType('breakfast')} className={display.btnMenu === 'breakfast' ? 'btn-active options-food' : 'options-food'}>
          BREAKFAST
        </button>
        <button type="button" onClick={() => handleType('menu')} className={display.btnMenu === 'menu' ? 'btn-active options-food' : 'options-food'}>
          DINNER & LUNCH
        </button>
      </div>
      <div className="box-photos">
        { display.btnType
        && (
        <div className="box-btn-food">
          <button type="button" onClick={() => handleType('burger')} className="btn-food">HAMBURGUERS</button>
          <button type="button" onClick={() => handleType('extra')} className="btn-food">ADITIONALS</button>
          <button type="button" onClick={() => handleType('drink')} className="btn-food">DRINKS</button>
        </div>
        )}
        <div className="box-option-food">
          {
            state.products.length > 0
              ? state.products.map((element) => (
                <div key={element._id} className="box-food" onClick={() => addProduct(element)} role="button" tabIndex={0}>
                  <img src={element.image} alt="logo" className="img-food" />
                  <p>{element.name}</p>
                </div>
              )) : (
                <div className="box-food">
                  <p>Not available products</p>
                </div>
              )
          }
        </div>
      </div>
    </section>
  );
};

export default ProductsMenu;
