import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRedux from '../tests/renderWithRedux';
import App from '../App';

describe('Testando a tela NotFound', () => {
  it('A tela possui o texto Not Found?', () => {
    renderWithRedux(<App />, '/explore/drinks/nationalities');

    const pharagraph = screen.findByText('/Not Found/i');
    expect(pharagraph).toBeDefined();
  });
});
