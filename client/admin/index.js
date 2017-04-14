import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import App from './components/App.jsx';
import {PostsStore} from '../stores/posts-store';
import {UserStore} from '../stores/user-store'

const postsStore = new PostsStore();
const userStore = new UserStore();

ReactDOM.render(
  <Provider postsStore={postsStore} userStore={userStore}>
    <App />
  </Provider>,
  document.getElementById('root'));