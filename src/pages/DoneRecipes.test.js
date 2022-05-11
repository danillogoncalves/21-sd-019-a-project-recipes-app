import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchRequest from '../../cypress/mocks/fetch';
import renderWithRedux from '../tests/renderWithRedux';
import App from '../App';

const ROUTE = '/done-recipes';

describe('Testando a tela de Detalhe das Comidas', () => {
  const doneRecipes = [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url) => fetchRequest(url));
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
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

    const image0 = screen.getByTestId(/0-horizontal-image/i);
    expect(image0).toBeInTheDocument();

    const name0 = screen.getByTestId(/0-horizontal-name/i);
    expect(name0).toBeInTheDocument();

    const doneDate0 = screen.getByTestId(/0-horizontal-done-date/i);
    expect(doneDate0).toBeInTheDocument();

    const topText0 = screen.getByTestId(/0-horizontal-top-text/i);
    expect(topText0).toBeInTheDocument();

    const image1 = screen.getByTestId(/1-horizontal-image/i);
    expect(image1).toBeInTheDocument();

    const name1 = screen.getByTestId(/1-horizontal-name/i);
    expect(name1).toBeInTheDocument();

    const topText1 = screen.getByTestId(/1-horizontal-top-text/i);
    expect(topText1).toBeInTheDocument();

    const doneDate1 = screen.getByTestId(/1-horizontal-done-date/i);
    expect(doneDate1).toBeInTheDocument();

    const curry = screen.getByTestId(/0-Curry-horizontal-tag/i);
    expect(curry).toBeInTheDocument();
  });

  it('1', () => {
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
