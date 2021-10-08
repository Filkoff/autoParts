import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './reducers';
import { Provider } from 'react-redux';

import './i18n';

ReactDOM.render(
  <Provider store={store}>
    <Suspense
      fallback={
        <div className="loader">
          <div className="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      }
    >
      <App />
    </Suspense>
  </Provider>,
  document.getElementById('root')
);
