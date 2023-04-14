import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './ReduxStore/Redux';
import {Provider} from 'react-redux'; 
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './ReduxStore/Redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
const create=ReactDOM.createRoot(document.createElement('div'))

root ? root.render(
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
<React.StrictMode>
  <App />
</React.StrictMode>
  </PersistGate>
  </Provider>
)

:
 create.render(
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
  <App />
  </PersistGate>
  </Provider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
