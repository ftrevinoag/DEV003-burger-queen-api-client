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

describe('Comportamiento', () => {
  test('Debería mostrar un mensaje de error cuando se envía un formulario vacío', () => {
    render(<FormLogin user= {user} error={error} />);
    const submitButton = screen.getByRole('button', { name: /Iniciar sesión/i });
    userEvent.click(submitButton);
    screen.getByText('Por favor, complete todos los campos');
  });
});