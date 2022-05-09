import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRedux from '../tests/renderWithRedux';
import Login from './Login';

describe('Testando a tela de Login', () => {
  it('Tem o titulo Login?', () => {
    renderWithRedux(<Login />);
    const heading = screen.getByRole('heading', { name: /login/i, level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('Tem o input para o Email?', () => {
    renderWithRedux(<Login />);
    const inputEmail = screen.getByPlaceholderText(/email/i);
    expect(inputEmail).toBeInTheDocument();
  });

  it('Tem o input para o Password?', () => {
    renderWithRedux(<Login />);
    const inputPassword = screen.getByPlaceholderText(/password/i);
    expect(inputPassword).toBeInTheDocument();
  });

  it('Tem o button Enter?', () => {
    renderWithRedux(<Login />);
    const button = screen.getByRole('button', { name: /enter/i });
    expect(button).toBeInTheDocument();
  });

  it('Ao clicar no botão Enter, deve ser direcionado para "/foods"', () => {
    const { history, store } = renderWithRedux(<Login />);
    const inputEmail = screen.getByPlaceholderText(/email/i);
    const inputPassword = screen.getByPlaceholderText(/password/i);
    const button = screen.getByRole('button', { name: /enter/i });

    expect(button).toBeDisabled();

    userEvent.type(inputEmail, 'email@email.com');
    userEvent.type(inputPassword, '1234567');

    expect(button).not.toBeDisabled();

    userEvent.click(button);

    const titleFoods = history.location.pathname;
    expect(titleFoods).toBe('/foods');

    const emailInStore = store.getState().userReducer.email;
    expect(emailInStore).toBe('email@email.com');
  });
});
