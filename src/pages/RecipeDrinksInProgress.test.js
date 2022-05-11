import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchRequest from '../../cypress/mocks/fetch';
import renderWithRedux from '../tests/renderWithRedux';
import App from '../App';

const ROUTE = '/drinks/15997/in-progress';

describe('Testando a tela de Bebidas em Progresso', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url) => fetchRequest(url));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('', () => {
    renderWithRedux(<App />, ROUTE);
    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });

    const buttonShare = screen.getByTestId(/share-btn/i); // compartilhar
    expect(buttonShare).toBeInTheDocument();
    userEvent.click(buttonShare);
    const linkCopied = screen.getByText(/link copied/i);
    expect(linkCopied).toBeInTheDocument();
  });

  it('', () => {
    renderWithRedux(<App />, ROUTE);
    const buttonFavorite = screen.getByTestId(/favorite-btn/i); // favoritar
    expect(buttonFavorite).toBeInTheDocument();
    userEvent.click(buttonFavorite);
    userEvent.click(buttonFavorite);
  });

  it('', () => {
    const { history } = renderWithRedux(<App />, ROUTE);

    const buttonStartRecipe = screen.getByTestId(/finish-recipe-btn/i); // finish/done
    expect(buttonStartRecipe).toBeInTheDocument();

    userEvent.click(buttonStartRecipe);

    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('3', async () => {
    renderWithRedux(<App />, ROUTE);
    const ingredientStep = await screen.findByTestId('0-ingredient-step');
    expect(ingredientStep).toBeInTheDocument();

    userEvent.click(ingredientStep);
    // 0-ingredient-step
  });
});
