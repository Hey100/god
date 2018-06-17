import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
// import logger from 'redux-logger';
import App from './components/App';

ReactDOM.render(
  <Root>
    <App />
  </Root>,
  document.querySelector('#root')
);
