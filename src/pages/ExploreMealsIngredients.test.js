import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchRequest from '../../cypress/mocks/fetch';
import renderWithRedux from '../tests/renderWithRedux';
import App from '../App';

const ROUTE = '/explore/foods/ingredients';

describe('Testando a página Explore Meals', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url) => fetchRequest(url));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('1', async () => {
    renderWithRedux(<App />, ROUTE);
    const ingredientCard = await screen.findByTestId('0-ingredient-card');
    expect(ingredientCard).toBeInTheDocument();

    userEvent.click(ingredientCard);
  });
});
