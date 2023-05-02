import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const Categories = () => {
  const currentUSer = sessionStorage.getItem('currentRol');

  return (
    <>
      <Header title="CATEGORIES" />
      <section className="container-category">
        <div className="waiter-choise">
          <Link to="/menu">
            <div className="category">MENU</div>
          </Link>
          <Link to="/orders">
            <div className="category">PROCESSED ORDERS</div>
          </Link>
          <Link to="/kitchen">
            <div className="category">KITCHEN</div>
          </Link>
        </div>
        { currentUSer === 'true' && (
        <div className="admin-choise">
          <Link to="/userlist">
            <div className="category">ADMIN USERS</div>
          </Link>
          <Link to="/productlist">
            <div className="category">ADMIN PRODUCTS</div>
          </Link>
        </div>
        )}
      </section>
    </>
  );
};

export default Categories;
