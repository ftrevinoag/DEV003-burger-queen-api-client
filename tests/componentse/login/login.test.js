import React from 'react';
import { render, screen } from '@testing-library/react';
import FormLogin from '../../../components/login/FormLogin';
import userEvent from '@testing-library/user-event';


const user = {
    userEmail: 'example@gmail.com',
    userContraseña: '13142dsg',
  }

const error = {
  userEmail: false,
  userContraseña: false,
};

describe('Render', () => {
  test('Debería encontrar "Inicia sesión" en el componente', () => {
    render (<FormLogin user= {user} error={error} />);
    screen.getByText('Inicia sesión');
  })

  test('Debería retornar el valor de name', () => {
    render(<FormLogin user= {user} error={error} />);
    expect(user.userEmail).toBe('example@gmail.com');
  });
});