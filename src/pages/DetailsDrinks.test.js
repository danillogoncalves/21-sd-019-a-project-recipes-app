import React from 'react';
import { screen } from '@testing-library/react';
import fetchRequest from '../../cypress/mocks/fetch';
import renderWithRedux from '../tests/renderWithRedux';
import App from '../App';
import { listOneDrink } from '../tests/mocks/listItems';

describe('Testando a tela de Detalhe das Bebidas', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url) => fetchRequest(url));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Itens na tela', async () => {
    const { history } = renderWithRedux(<App />, '/drinks/15997');
    expect(history.location.pathname).toBe('/drinks/15997');

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
});
