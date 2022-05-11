import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from '../redux/reducer';

export default function renderWithRedux(
  component,
  route,
  {
    initialState,
    store = configureStore({
      reducer: rootReducer,
      initialState,
      middleware: [thunk],
    }),
  } = {},
) {
  const customHistory = createMemoryHistory({ initialEntries: [route] });

  const returnFromRender = render(
    <Router history={ customHistory }>
      <Provider store={ store }>
        {component}
      </Provider>
    </Router>,
  );

  return { ...returnFromRender, history: customHistory, store };
}
