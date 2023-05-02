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

  test('Debería llamar a la función onSubmit cuando se envía un formulario válido', () => {
    const handleSubmit = jest.fn();
    render(<FormLogin user= {user} error={error} onSubmit={handleSubmit} />);
    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const submitButton = screen.getByRole('button', { name: /Iniciar sesión/i });
    userEvent.type(emailInput, user.userEmail);
    userEvent.type(passwordInput, user.userContraseña);
    userEvent.click(submitButton);
    expect(handleSubmit).toHaveBeenCalledWith(user.userEmail, user.userContraseña);
  });

  test('Debería mostrar un mensaje de error cuando se ingresa una contraseña incorrecta', () => {
    render(<FormLogin user= {user} error={{ ...error, userContraseña: true }} />);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    userEvent.type(passwordInput, '123456');
    const submitButton = screen.getByRole('button', { name: /Iniciar sesión/i });
    userEvent.click(submitButton);
    screen.getByText('La contraseña ingresada es incorrecta');
  });

});