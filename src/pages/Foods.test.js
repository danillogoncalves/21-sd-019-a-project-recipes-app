import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import waitForExpect from 'wait-for-expect';
import fetchRequest from '../../cypress/mocks/fetch';
import { listFoodsBeef } from '../tests/mocks/listItems';
import renderWithRedux from '../tests/renderWithRedux';
import App from '../App';

function handleTheSearch(search) {
  const buttonImgSearch = screen.getByTestId('search-top-btn');
  userEvent.click(buttonImgSearch);
  const inputSearch = screen.getByPlaceholderText(/search recipe/i);
  userEvent.type(inputSearch, search);
  const radioName = screen.getByTestId('name-search-radio');
  userEvent.click(radioName);
  const buttonSearch = screen.getByTestId('exec-search-btn');
  userEvent.click(buttonSearch);
}

describe('Testando a tela de Foods', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url) => fetchRequest(url));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Tem "Foods" no titulo da tela', () => {
    renderWithRedux(<App />, '/foods');
    const title = screen.getByText(/foods/i);
    expect(title).toBeInTheDocument();
  });

  it('Tem o Botão do Profile no Header e redireciona para sua página?', () => {
    const { history } = renderWithRedux(<App />, '/foods');
    const buttonProfile = screen.getByTestId('profile-top-btn');
    expect(buttonProfile).toBeInTheDocument();

    userEvent.click(buttonProfile);

    const profilePage = history.location.pathname;
    expect(profilePage).toBe('/profile');
  });

  it('Tem o Botão do Search no Hearder?', () => {
    renderWithRedux(<App />, '/foods');
    const buttonImgSearch = screen.getByTestId('search-top-btn');
    expect(buttonImgSearch).toBeInTheDocument();

    userEvent.click(buttonImgSearch);

    const inputSearch = screen.getByPlaceholderText(/search recipe/i);
    expect(inputSearch).toBeInTheDocument();

    const radioIngredient = screen.getByTestId('ingredient-search-radio');
    expect(radioIngredient).toBeInTheDocument();

    const radioName = screen.getByTestId('name-search-radio');
    expect(radioName).toBeInTheDocument();

    const radioLetter = screen.getByTestId('first-letter-search-radio');
    expect(radioLetter).toBeInTheDocument();

    const buttonSearch = screen.getByTestId('exec-search-btn');
    expect(buttonSearch).toBeInTheDocument();

    userEvent.click(buttonImgSearch);
    expect(inputSearch).not.toBeInTheDocument();
  });

  it('Tem os buttons de cada categoria de foods?', async () => {
    renderWithRedux(<App />, '/foods');
    const buttonBeef = await screen.findByTestId('Beef-category-filter');
    expect(buttonBeef).toBeInTheDocument();

    userEvent.click(buttonBeef);
    const listFoods = await screen.findAllByTestId(/recipe-card/i);

    listFoods.forEach(
      async (_item, index) => {
        const cardImg = await screen.findByTestId(`${index}-card-img`);
        expect(cardImg).toBeInTheDocument();
        const name = await screen.findByText(listFoodsBeef[index]);
        expect(name).toBeInTheDocument();
      },
    );

    const buttonAll = await screen.findByTestId('All-category-filter');
    userEvent.click(buttonAll);

    const buttonGoat = await screen.findByTestId('Goat-category-filter');
    userEvent.click(buttonGoat);

    userEvent.click(buttonGoat);
  });

  it('Pesquisa com name NULL, abre mensagem de alerta.', async () => {
    renderWithRedux(<App />, '/foods');
    window.alert = jest.fn();

    handleTheSearch('xablau');

    await waitForExpect(() => {
      expect(fetch).toHaveBeenCalled();
    });

    await waitForExpect(() => {
      expect(window.alert).toHaveBeenCalledTimes(1);
    });
  });

  it('Ao pesquisar name que só tenha uma receita.', () => {
    renderWithRedux(<App />, '/foods');

    handleTheSearch('Arrabiata');
  });
});
