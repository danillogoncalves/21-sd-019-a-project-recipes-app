import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRedux from '../tests/renderWithRedux';
import App from '../App';

describe('Testando a tela de Login', () => {
  it('Tem o titulo Login?', () => {
    renderWithRedux(<App />, '/');
    const heading = screen.getByRole('heading', { name: /login/i, level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('Tem o input para o Email?', () => {
    renderWithRedux(<App />, '/');
    const inputEmail = screen.getByPlaceholderText(/email/i);
    expect(inputEmail).toBeInTheDocument();
  });

  it('Tem o input para o Password?', () => {
    renderWithRedux(<App />, '/');
    const inputPassword = screen.getByPlaceholderText(/password/i);
    expect(inputPassword).toBeInTheDocument();
  });

  it('Tem o button Enter?', () => {
    renderWithRedux(<App />, '/');
    const button = screen.getByRole('button', { name: /enter/i });
    expect(button).toBeInTheDocument();
  });

  it('Ao clicar no botão Enter, deve ser direcionado para "/foods"', () => {
    const { history, store } = renderWithRedux(<App />, '/');
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
