import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import reducers from './reducer';
import { history } from './helper/history';
import { getAuthUserData } from './helper/auth';
import { signinSuccess, logout } from './action/authAction';
import { initAuthInterceptor } from './helper/api';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const userAuth = getAuthUserData();
if (userAuth) {
  store.dispatch(signinSuccess(userAuth));
}

initAuthInterceptor(store, logout)

ReactDOM.render(
  <div>
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter histoy={history}>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  </div>,
  document.getElementById('root')
);

serviceWorker.unregister();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();