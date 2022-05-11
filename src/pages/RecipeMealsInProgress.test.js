import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchRequest from '../../cypress/mocks/fetch';
import renderWithRedux from '../tests/renderWithRedux';
import App from '../App';

const ROUTE = '/foods/52771/in-progress';

describe('Testando a tela de Comidas em Progresso', () => {
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

    const buttonShare = screen.getByTestId(/share-btn/i);
    expect(buttonShare).toBeInTheDocument();
    userEvent.click(buttonShare);
    const linkCopied = screen.getByText(/link copied/i);
    expect(linkCopied).toBeInTheDocument();
  });

  it('', () => {
    renderWithRedux(<App />, ROUTE);
    const buttonFavorite = screen.getByTestId(/favorite-btn/i);
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
});
