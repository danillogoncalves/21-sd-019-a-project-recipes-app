import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchRequest from '../../cypress/mocks/fetch';
import renderWithRedux from '../tests/renderWithRedux';
import App from '../App';

const ROUTE = '/explore/foods/nationalities';

describe('Testando a página Explore Nationalities', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url) => fetchRequest(url));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('1', async () => {
    renderWithRedux(<App />, ROUTE);
    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
  });

  it('2', async () => {
    renderWithRedux(<App />, ROUTE);
    const dropdown = await screen.findByTestId('explore-by-nationality-dropdown');
    expect(dropdown).toBeInTheDocument();

    userEvent.selectOptions(dropdown, 'Japanese');
    userEvent.selectOptions(dropdown, 'All');
    // explore-by-nationality-dropdown
  });
});
