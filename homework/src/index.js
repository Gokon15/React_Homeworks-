import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";

import './index.css';
import App from './App';
import { store } from './rdx/';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Fragment>
    <BrowserRouter>
      <Provider store={store}>
        <App textProp="Hello world! From Props" />
      </Provider>
    </BrowserRouter>
  </React.Fragment>
);
