import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import Header from '../components/Header';
import LogIn from '../components/login/LogIn';
import Menu from '../components/order/Menu';
import UserList from '../../components/admin/users/UserList';
import ProductList from '../components/admin/products/ProductList';

describe('App', () => {
  test('Deberia encontrar el componente App', () => {
    render(<App />);
    // screen.debug();
  });

  describe('Header', () => {
    test('Debería encontrar el texto "Burger Queen" en el componente', () => {
      render(<Header />);
      const title = screen.getByText(/Burger Queen/i);
      expect(title).toBeInTheDocument();
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

  test('Debería encontrar un enlace a la página de productos en el componente', () => {
    render(<Header />);
    const productsLink = screen.getByRole('link', { name: /Productos/i });
    expect(productsLink).toBeInTheDocument();
    expect(productsLink).toHaveAttribute('href', '/productos');
  });
});

});
