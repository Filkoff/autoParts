import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './i18n';
import App from './App';
import { store } from './reducers';
import './index.css';

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
