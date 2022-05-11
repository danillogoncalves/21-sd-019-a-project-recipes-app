import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import waitForExpect from 'wait-for-expect';
import fetchRequest from '../../cypress/mocks/fetch';
import App from '../App';
import { listDrinksOrdinaryDrink } from '../tests/mocks/listItems';
import renderWithRedux from '../tests/renderWithRedux';

const firstLetterSearchRadio = 'first-letter-search-radio';
const searchTopBtn = 'search-top-btn';
const execSearchBtn = 'exec-search-btn';

function handleTheSearch(search) {
  const buttonImgSearch = screen.getByTestId(searchTopBtn);
  userEvent.click(buttonImgSearch);
  const inputSearch = screen.getByPlaceholderText(/search recipe/i);
  userEvent.type(inputSearch, search);
  const radioName = screen.getByTestId('name-search-radio');
  userEvent.click(radioName);
  const buttonSearch = screen.getByTestId(execSearchBtn);
  userEvent.click(buttonSearch);
}

describe('Testando a tela de Drinks', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url) => fetchRequest(url));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Tem "Drinks" no titulo da tela', () => {
    renderWithRedux(<App />, '/drinks');
    const title = screen.getByText(/drinks/i);
    expect(title).toBeInTheDocument();
  });

  it('Tem o Botão do Profile no Header e redireciona para sua página?', () => {
    const { history } = renderWithRedux(<App />, '/drinks');
    const buttonProfile = screen.getByTestId('profile-top-btn');
    expect(buttonProfile).toBeInTheDocument();

    userEvent.click(buttonProfile);

    const profilePage = history.location.pathname;
    expect(profilePage).toBe('/profile');
  });

  it('Tem o Botão do Search no Hearder?', () => {
    renderWithRedux(<App />, '/drinks');
    const buttonImgSearch = screen.getByTestId(searchTopBtn);
    expect(buttonImgSearch).toBeInTheDocument();

    userEvent.click(buttonImgSearch);

    const inputSearch = screen.getByPlaceholderText(/search recipe/i);
    expect(inputSearch).toBeInTheDocument();

    const radioIngredient = screen.getByTestId('ingredient-search-radio');
    expect(radioIngredient).toBeInTheDocument();

    const radioName = screen.getByTestId('name-search-radio');
    expect(radioName).toBeInTheDocument();

    const radioLetter = screen.getByTestId(firstLetterSearchRadio);
    expect(radioLetter).toBeInTheDocument();

    const buttonSearch = screen.getByTestId(execSearchBtn);
    expect(buttonSearch).toBeInTheDocument();

    userEvent.click(buttonImgSearch);
    expect(inputSearch).not.toBeInTheDocument();
  });

  it('Tem os buttons de cada categoria de drinks?', async () => {
    renderWithRedux(<App />, '/drinks');
    const buttonOrdinaryDrink = await screen
      .findByTestId('Ordinary Drink-category-filter');
    expect(buttonOrdinaryDrink).toBeInTheDocument();

    userEvent.click(buttonOrdinaryDrink);
    const listDrinks = await screen.findAllByTestId(/recipe-card/i);

    listDrinks.forEach(
      async (_item, index) => {
        const cardImg = await screen.findByTestId(`${index}-card-img`);
        expect(cardImg).toBeInTheDocument();
        const name = await screen.findByText(listDrinksOrdinaryDrink[index]);
        expect(name).toBeInTheDocument();
      },
    );

    const buttonAll = await screen.findByTestId('All-category-filter');
    userEvent.click(buttonAll);

    const buttonCocoa = await screen.findByTestId('Cocoa-category-filter');
    userEvent.click(buttonCocoa);

    userEvent.click(buttonCocoa);
  });

  it('Pesquisa com name NULL, abre mensagem de alerta.', async () => {
    renderWithRedux(<App />, '/drinks');
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
    renderWithRedux(<App />, '/drinks');

    handleTheSearch('Aquamarine');
  });
  it('Verifica radio buttons de ingredients e first letter', () => {
    renderWithRedux(<App />, '/drinks');
    const buttonImgSearch = screen.getByTestId(searchTopBtn);
    userEvent.click(buttonImgSearch);
    const radioIngredient = screen.getByTestId('ingredient-search-radio');
    userEvent.click(radioIngredient);
    const radioLetter = screen.getByTestId(firstLetterSearchRadio);
    userEvent.click(radioLetter);
  });
  it('Verifica se aparece o alert na busca de first letter', async () => {
    renderWithRedux(<App />, '/drinks');
    window.alert = jest.fn();
    const buttonImgSearch = screen.getByTestId(searchTopBtn);
    userEvent.click(buttonImgSearch);
    const radioLetter = screen.getByTestId(firstLetterSearchRadio);
    userEvent.click(radioLetter);
    const inputSearch = screen.getByPlaceholderText(/search recipe/i);
    userEvent.type(inputSearch, 'br');
    const buttonSearch = screen.getByTestId(execSearchBtn);
    userEvent.click(buttonSearch);
    await waitForExpect(() => {
      expect(fetch).toHaveBeenCalled();
    });
    await waitForExpect(() => {
      expect(window.alert).toHaveBeenCalledTimes(1);
    });
  });
});
