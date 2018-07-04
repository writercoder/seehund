import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import App from './components/App.jsx';
import { PostsStore } from '../stores/posts-store';
import { UserStore } from '../stores/user-store';
import { MessagesStore } from '../stores/messages-store';
import { BlogStore } from '../stores/blog-store';

import 'grommet/scss/vanilla/index.scss';

const userStore = new UserStore();
const postsStore = new PostsStore(userStore);
const messagesStore = new MessagesStore();
const blogStore = new BlogStore();

ReactDOM.render(
  <Provider
    postsStore={postsStore}
    userStore={userStore}
    messagesStore={messagesStore}
    blogStore={blogStore}>
    <App />
  </Provider>,
  document.getElementById('root'));
