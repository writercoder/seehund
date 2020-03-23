const express = require('express');
const app = express();
app.use(express.static('themes/default/assets'))
const port = 3333;
const posts = require('../lib/blog/posts');
const metadata = require('../lib/blog/metadata');
const theme = require('./react-theme');

const bucketName = process.env.SEEHUND_WEB_BUCKET;
const postsTableName = `${process.env.SEEHUND_BLOG}-postsTable`;

app.get('/', async (req, res) => {
  try {
    const blog = await metadata.get({bucketName});
    const data = await posts.all({postsTableName});
    res.send(theme.renderIndex(data, blog));
  } catch (e) {
    console.error(e);
  }
});

app.get('/posts/:postString.html', async (req, res) => {
  try {
    const postId = req.params.postString.split('-').pop()
    const blog = await metadata.get({bucketName});
    const data = await posts.find({postsTableName, id: postId});
    res.send(theme.renderPost(data, blog));
  } catch (e) {
    console.error(e);
  }
});

app.listen(port, () => console.log(`Seehund devserver listening on port ${port}!`));
