/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
import React from 'react';
import { deleteProduct } from '../../../controller/admin-products';

const TempProductsTable = ({ product, setProduct, modalRoot }) => {
  const handleDeleteProduct = (id) => {
    setProduct((prevState) => ({
      ...prevState,
      allProducts: product.allProducts.filter((item) => item._id !== id),
    }));
    deleteProduct(id);
  };

  const handleUpdateProduct = (item) => {
    document.body.append(modalRoot);
    setProduct((prevState) => ({
      ...prevState,
      productData: {
        _id: item._id,
        name: item.name,
        price: item.price,
        image: item.image,
        type: item.type,
        dateEntry: item.dateEntry,
      },
      display: {
        modal: true,
        button: true,
      },
    }));
  };

  return (
    <table className="table t-product">
      <thead className="head-table">
        <tr>
          {/* <th>Id</th> */}
          <th>NAME</th>
          <th>PRICE</th>
          <th>IMAGE</th>
          <th>CATEGORY</th>
          <th>DATE</th>
          <th />
        </tr>
      </thead>
      <tbody className="body-table">
        {
          product.allProducts.length > 0
            ? product.allProducts.map((element) => (
              <tr key={element._id}>
                {/* <td>{element._id}</td> */}
                <td>{element.name}</td>
                <td>
                  $
                  {element.price}
                </td>
                <td>{element.image ? <img src={element.image} alt="product" className="t-img" /> : 'not' }</td>
                <td>{element.type}</td>
                <td className="t-date">{element.dateEntry}</td>
                <td>
                  <i className="icon edit fas fa-edit" onClick={() => handleUpdateProduct(element)} role="button" tabIndex={0} />
                  <i className="icon delete fas fa-trash-alt" onClick={() => handleDeleteProduct(element._id)} role="button" tabIndex={0} />
                </td>
              </tr>
            )) : (
              <tr>
                <td>NO ADDED PRODUCTS</td>
              </tr>
            )
        }
      </tbody>
    </table>
  );
};

export default TempProductsTable;