import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRedux from '../tests/renderWithRedux';
import App from '../App';

describe('Testando a tela de Explore', () => {
  it('Verifica se o button Explore Foods existe e direciona para a sua pagina', () => {
    const { history } = renderWithRedux(<App />, '/explore');
    const buttonExploreFoods = screen.getByRole('button', { name: /explore foods/i });
    expect(buttonExploreFoods).toBeInTheDocument();
    userEvent.click(buttonExploreFoods);
    const exploreFoodsPage = history.location.pathname;
    expect(exploreFoodsPage).toBe('/explore/foods');
  });
  it('Verifica se o button Explore Drinks existe e direciona para a sua pagina', () => {
    const { history } = renderWithRedux(<App />, '/explore');
    const buttonExploreDrinks = screen.getByRole('button', { name: /explore drinks/i });
    expect(buttonExploreDrinks).toBeInTheDocument();
    userEvent.click(buttonExploreDrinks);
    const exploreDrinksPage = history.location.pathname;
    expect(exploreDrinksPage).toBe('/explore/drinks');
  });
});
