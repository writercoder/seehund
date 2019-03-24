const express = require('express');
const app = express();
const port = 3333;
const posts = require('../lib/blog/posts');
const metadata = require('../lib/blog/metadata');
const theme = require('./nunjucks-theme');

const bucketName = process.env.SEEHUND_WEB_BUCKET;
const postsTableName = `${process.env.SEEHUND_BLOG}-postsTable`;

app.get('/', async (req, res) => {
  try {
    const blog = await metadata.get({bucketName});
    const data = await posts.all({postsTableName});
    // res.json([data, blog]);
    res.send(theme.renderIndex(data, blog));
  } catch (e) {
    console.error(e);
  }
});

app.get('/posts/:postId.html', async (req, res) => {
  try {
    const blog = await metadata.get({bucketName});
    const data = await posts.find({postsTableName, id:req.params.postId});
    // res.json(data);
    res.send(theme.renderPost(data, blog));
  } catch (e) {
    console.error(e);
  }
});

app.listen(port, () => console.log(`Seehund devserver listening on port ${port}!`));
