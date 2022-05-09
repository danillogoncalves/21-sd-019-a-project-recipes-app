import { screen } from '@testing-library/react';
import React from 'react';
import renderWithRedux from '../tests/renderWithRedux';
import Foods from './Foods';

describe('Testando a tela de Login', () => {
  renderWithRedux(<Foods />);
  it('Teste', async () => {
    const teste = await screen.findByText('Corba');
    expect(teste).toBeInTheDocument();
  });
});
