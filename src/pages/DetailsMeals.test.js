import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchRequest from '../../cypress/mocks/fetch';
import renderWithRedux from '../tests/renderWithRedux';
import App from '../App';
import { listOneMeal } from '../tests/mocks/listItems';

const ROUTE = '/foods/52771';

describe('Testando a tela de Detalhe das Comidas', () => {
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

    const headingIngredients = screen
      .getByRole('heading', { name: /ingredients/i });
    expect(headingIngredients).toBeInTheDocument();

    const listIngredients = await screen.findAllByTestId(/ingredient-name-and-measure/i);

    listIngredients.forEach(
      (item, index) => {
        expect(item.innerHTML).toBe(listOneMeal[index]);
      },
    );

    const headingInstructions = screen
      .getByRole('heading', { name: /instructions/i });
    expect(headingInstructions).toBeInTheDocument();
  });

  it('', () => {
    const { history } = renderWithRedux(<App />, ROUTE);

    const buttonStartRecipe = screen.getByTestId(/start-recipe-btn/i);
    expect(buttonStartRecipe).toBeInTheDocument();

    userEvent.click(buttonStartRecipe);

    expect(history.location.pathname).toBe('/foods/52771/in-progress');
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

    // console.log(window.navigator.clipboard.writeText);
    userEvent.click(buttonShare);
    const linkCopied = screen.getByText(/link copied/i);
    expect(linkCopied).toBeInTheDocument();
    // share-bt
  });
});
