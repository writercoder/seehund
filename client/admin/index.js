import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import App from './components/App.jsx';
import {PostsStore} from '../stores/posts-store';

const posts = new PostsStore();

ReactDOM.render(
  <Provider postsStore={posts}>
    <App posts={posts} />
  </Provider>,
  document.getElementById('root'));