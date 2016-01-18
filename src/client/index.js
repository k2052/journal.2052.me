import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import routes from '../routes';

const rootElement = document.getElementById('app');
require('styles//App.sass');

const store = configureStore(window.__DATA__);

render(
  <Provider store={store}>
    <Router history={createBrowserHistory()} routes={routes} />
  </Provider>,
  rootElement
);
