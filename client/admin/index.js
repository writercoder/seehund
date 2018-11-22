import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import App from './components/App.jsx';
import { PostsStore } from '../stores/posts-store';
import { UserStore } from '../stores/user-store';
import { MessagesStore } from '../stores/messages-store';
import { BlogStore } from '../stores/blog-store';
import { MetadataStore } from '../stores/metadata-store';
import { ImagesStore } from '../stores/images-store';

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
