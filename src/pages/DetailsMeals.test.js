import React from 'react';
import { screen } from '@testing-library/react';
import fetchRequest from '../../cypress/mocks/fetch';
import renderWithRedux from '../tests/renderWithRedux';
import App from '../App';
import { listOneMeal } from '../tests/mocks/listItems';

describe('Testando a tela de Detalhe das Comidas', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url) => fetchRequest(url));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Itens na tela', async () => {
    const { history } = renderWithRedux(<App />, '/foods/52771');
    expect(history.location.pathname).toBe('/foods/52771');

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
});
