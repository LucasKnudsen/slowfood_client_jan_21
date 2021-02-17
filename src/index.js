import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios'
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'

axios.defaults.baseURL = 'http://localhost:3000/api'

ReactDOM.render(
  <App />,
  document.getElementById('root'));

serviceWorker.unregister();
