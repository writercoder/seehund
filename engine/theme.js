
import {markdown} from 'markdown'
import {postUrl} from './helpers.js'

export function renderPost(post) {
  const html = markdown.toHTML(post.content || '')
  return `<div><h1>${post.title}</h1><div>${html}</div><div>`
}

export function renderIndexPage(posts) {
  const postList = posts.map((post) => `<p><a href="${postUrl(post)}">${post.title}</a></p>`).join("")
  return `<div><h1>Blog Index Page!</h1><div>${postList}</div></div>`
}