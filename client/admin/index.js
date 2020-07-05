import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import App from './components/App.jsx';
import { PostsStore } from '../domain/posts/PostsStore';
import { UserStore } from '../domain/user/UserStore';
import { MessagesStore } from '../domain/messages/MessagesStore';
import { BlogStore } from '../domain/blog/BlogStore';
import { MetadataStore } from '../domain/metadata/MetadataStore';
import { ImagesStore } from '../domain/images/ImagesStore';

import 'grommet/scss/vanilla/index.scss';

const userStore = new UserStore();
const postsStore = new PostsStore(userStore);
const metadataStore = new MetadataStore(userStore);

const messagesStore = new MessagesStore();
const blogStore = new BlogStore();
const imagesStore = new ImagesStore(userStore);

ReactDOM.render(
  <Provider
    postsStore={postsStore}
    userStore={userStore}
    messagesStore={messagesStore}
    blogStore={blogStore}
    metadataStore={metadataStore}
    imagesStore={imagesStore}>
    <App />
  </Provider>,
  document.getElementById('root'));
