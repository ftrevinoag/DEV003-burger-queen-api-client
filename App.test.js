import React from 'react';
import { render } from '@testing-library/react';
import App from '../../App';
import Header from '../../components/Header';
import LogIn from '../../components/login/LogIn';
import Menu from '../../components/order/Menu';
import UserList from '../../components/admin/users/UserList';
import ProductList from '../../components/admin/products/ProductList';

describe('App', () => {
  test('Deberia encontrar el componente App', () => {
    render(<App />);
    // screen.debug();
  });

  test('Deberia encontrar el componente Header', () => {
    render(<Header />);
    // screen.debug();
  });

  test('Deberia encontrar el componente de Login', () => {
    render(<LogIn />);
    // screen.debug();
  });

  test('Debería encontrar el componente menu', () => {
    render(<Menu />);
    // screen.debug();
  });

  test('Debería encontrar el componente userList', () => {
    render(<UserList />);
    // screen.debug();
  });
  test('Debería encontrar el componente ProductList', () => {
    render(<ProductList />);
    // screen.debug();
  });
});
