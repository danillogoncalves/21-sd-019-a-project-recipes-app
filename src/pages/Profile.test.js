import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import waitForExpect from 'wait-for-expect';
import renderWithRedux from '../tests/renderWithRedux';
import App from '../App';

describe('Testando a tela Profile', () => {
  it('A tela possui o botão Profile no Header?', () => {
    renderWithRedux(<App />, '/profile');

    const buttonProfile = screen.getByTestId('profile-top-btn');
    expect(buttonProfile).toBeInTheDocument();
  });

  it('A tela possui o email do usuário no Header?', async () => {
    const { history, store } = renderWithRedux(<App />, '/');

    const inputEmail = screen.getByPlaceholderText(/email/i);
    const inputPassword = screen.getByPlaceholderText(/password/i);
    const button = screen.getByRole('button', { name: /enter/i });

    expect(button).toBeDisabled();

    userEvent.type(inputEmail, 'email@email.com');
    userEvent.type(inputPassword, '1234567');

    expect(button).not.toBeDisabled();
    userEvent.click(button);

    const foodsPage = history.location.pathname;
    expect(foodsPage).toBe('/foods');

    const buttonProfile = screen.getByTestId('profile-top-btn');
    expect(buttonProfile).toBeInTheDocument();

    userEvent.click(buttonProfile);

    const profilePage = history.location.pathname;
    expect(profilePage).toBe('/profile');

    const emailInStore = store.getState().userReducer.email;
    await waitForExpect(() => {
      expect(emailInStore).toBe('email@email.com');
    });
  });

  it('A tela possui o button Done Recipes e redireciona para sua página?', () => {
    const { history } = renderWithRedux(<App />, '/profile');
    const buttonDone = screen.getByTestId('profile-done-btn');
    expect(buttonDone).toBeInTheDocument();

    userEvent.click(buttonDone);

    const donePage = history.location.pathname;
    expect(donePage).toBe('/done-recipes');
  });

  it('A tela possui o button Favorite Recipes e redireciona para sua página?', () => {
    const { history } = renderWithRedux(<App />, '/profile');
    const buttonFavorite = screen.getByTestId('profile-favorite-btn');
    expect(buttonFavorite).toBeInTheDocument();

    userEvent.click(buttonFavorite);

    const favoritePage = history.location.pathname;
    expect(favoritePage).toBe('/favorite-recipes');
  });

  it('A tela possui o button Logout e redireciona para sua página?', async () => {
    const { history, store } = renderWithRedux(<App />, '/profile');
    const buttonLogout = screen.getByTestId('profile-logout-btn');
    expect(buttonLogout).toBeInTheDocument();

    userEvent.click(buttonLogout);

    const loginPage = history.location.pathname;
    expect(loginPage).toBe('/');

    const emailInStore = store.getState().userReducer.email;
    await waitForExpect(() => {
      expect(emailInStore).toBe('');
    });
  });
});
