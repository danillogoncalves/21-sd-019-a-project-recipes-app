import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchRequest from '../../cypress/mocks/fetch';
import renderWithRedux from '../tests/renderWithRedux';
import App from '../App';

const ROUTE = '/favorite-recipes';

describe('Testando a tela de Detalhe das Comidas', () => {
  const favoriteRecipes = [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    },
  ];
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url) => fetchRequest(url));
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('1', () => {
    renderWithRedux(<App />, ROUTE);
    const pageTitle = screen.getByTestId(/page-title/i);
    expect(pageTitle).toBeInTheDocument();

    const allBtn = screen.getByTestId(/filter-by-all-btn/i);
    expect(allBtn).toBeInTheDocument();

    const foodBtn = screen.getByTestId(/filter-by-food-btn/i);
    expect(foodBtn).toBeInTheDocument();

    const drinkBtn = screen.getByTestId(/filter-by-drink-btn/i);
    expect(drinkBtn).toBeInTheDocument();
  });

  it('2', () => {
    renderWithRedux(<App />, ROUTE);

    const allBtn = screen.getByTestId(/filter-by-all-btn/i);
    expect(allBtn).toBeInTheDocument();

    userEvent.click(allBtn);

    const foodBtn = screen.getByTestId(/filter-by-food-btn/i);
    expect(foodBtn).toBeInTheDocument();

    userEvent.click(foodBtn);

    const drinkBtn = screen.getByTestId(/filter-by-drink-btn/i);
    expect(drinkBtn).toBeInTheDocument();

    userEvent.click(drinkBtn);
  });
});
