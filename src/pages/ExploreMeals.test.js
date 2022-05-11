import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import waitForExpect from 'wait-for-expect';
import renderWithRedux from '../tests/renderWithRedux';
import App from '../App';

const exploreFoods = '/explore/foods';

describe('Testando a página Explore Meals', () => {
  it('Verifica se o button By Ingredient existe e direciona para a sua pagina', () => {
    const { history } = renderWithRedux(<App />, exploreFoods);

    const buttonByIngredient = screen.getByRole('button', { name: /by ingredient/i });
    expect(buttonByIngredient).toBeInTheDocument();
    userEvent.click(buttonByIngredient);
    const exploreIngredients = history.location.pathname;
    expect(exploreIngredients).toBe('/explore/foods/ingredients');
  });

  it('Verifica se o button By Nationality existe e direciona para a sua pagina', () => {
    const { history } = renderWithRedux(<App />, exploreFoods);

    const buttonByNationality = screen.getByRole('button', { name: /by nationality/i });
    expect(buttonByNationality).toBeInTheDocument();
    userEvent.click(buttonByNationality);
    const exploreNationalities = history.location.pathname;
    expect(exploreNationalities).toBe('/explore/foods/nationalities');
  });

  it('Verifica se o button Surprise existe e direciona para a sua pagina', async () => {
    const { history } = renderWithRedux(<App />, exploreFoods);

    const buttonSurprise = screen.getByRole('button', { name: /surprise me!/i });
    expect(buttonSurprise).toBeInTheDocument();

    userEvent.click(buttonSurprise);

    const surprisePage = history.location.pathname;
    expect(surprisePage).toBe('');

    const supriseId = store.getState().mealsReducer.meal;
    await waitForExpect(() => {
      expect(supriseId).toBe('');
    });
  });
});
