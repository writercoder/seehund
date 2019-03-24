const path = require('path');
const nunjucks = require('nunjucks');
const njMarkdown = require('nunjucks-markdown');
const markdown = require('markdown').markdown;

const currentTheme = 'basic';
const themePath = path.join(__dirname, '..', 'themes', currentTheme);
const env = nunjucks.configure(themePath, {
  noCache: true,
  watch: true
});

njMarkdown.register(env, markdown.toHTML);

function renderIndex(posts, blog) {
  return nunjucks.render('index.njk', {posts, blog});
}

function renderPost(post, blog) {
  return nunjucks.render('post.njk', {post, blog});
};

module.exports = {renderIndex, renderPost};
