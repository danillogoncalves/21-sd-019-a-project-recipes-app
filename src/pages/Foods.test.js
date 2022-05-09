import { screen } from '@testing-library/react';
import React from 'react';
import renderWithRedux from '../tests/renderWithRedux';
import Foods from './Foods';

describe('Testando a tela de Foods', () => {
  it('Tem "Foods" no titulo da tela', () => {
    renderWithRedux(<Foods />);
    const title = screen.getByText(/foods/i);
    expect(title).toBeInTheDocument();
  });
});
