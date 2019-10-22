const sinon = require('sinon');
const libposts = require('../lib/blog/posts');
const posts = require('./posts')

const postsTableName = 'fake-posts-table';

const postFixtures = {
  newWithoutPath: {
    title: 'New post', content: 'Hello world'
  }
}

const events = {
  create: {
    body: JSON.stringify(postFixtures.newWithoutPath)
  }
};

describe('posts', () => {

  beforeAll(() => {
    process.env.POSTS_TABLE_NAME = postsTableName;
  })

  describe('create', () => {
    it("creates a post", () => {

    });
  });

});