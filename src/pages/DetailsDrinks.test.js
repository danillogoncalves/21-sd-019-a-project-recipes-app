import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchRequest from '../../cypress/mocks/fetch';
import renderWithRedux from '../tests/renderWithRedux';
import App from '../App';
import { listOneDrink } from '../tests/mocks/listItems';

const ROUTE = '/drinks/15997';

describe('Testando a tela de Detalhe das Bebidas', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url) => fetchRequest(url));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Itens na tela', async () => {
    const { history } = renderWithRedux(<App />, ROUTE);
    expect(history.location.pathname).toBe(ROUTE);

    const recibePhoto = await screen.findByTestId('recipe-photo');
    expect(recibePhoto).toBeInTheDocument();

    const recibeTitle = await screen.findByTestId('recipe-title');
    expect(recibeTitle).toBeInTheDocument();

    const recibeCategory = await screen.findByTestId('recipe-category');
    expect(recibeCategory).toBeInTheDocument();

    const headingIngredients = screen.getByRole('heading', { name: /ingredients/i });
    expect(headingIngredients).toBeInTheDocument();

    const getListIngredients = await screen
      .findAllByTestId(/ingredient-name-and-measure/i);

    getListIngredients.forEach(
      (item, index) => {
        expect(item.innerHTML).toBe(listOneDrink[index]);
      },
    );

    const headingInstructions = screen.getByRole('heading', { name: /instructions/i });
    expect(headingInstructions).toBeInTheDocument();
  });
  it('', () => {
    const { history } = renderWithRedux(<App />, ROUTE);

    const buttonStartRecipe = screen.getByTestId(/start-recipe-btn/i);
    expect(buttonStartRecipe).toBeInTheDocument();

    userEvent.click(buttonStartRecipe);
    expect(history.location.pathname).toBe('/drinks/15997/in-progress');

    history.goBack();

    const buttonContinueRecipe = screen.getByRole('button', { name: /continue recipe/i });
    expect(buttonContinueRecipe).toBeInTheDocument();

    userEvent.click(buttonContinueRecipe);
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
});
