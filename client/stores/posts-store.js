import {action, observable, runInAction} from "mobx"
const popsicle = require('popsicle')
import config from './../config.js'

export class Post {
  id = null
  @observable title;
  @observable content;
  @observable createdAt;

  constructor(id, title, content, createdAt) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
  }
}

export class PostsStore {
  @observable lastError
  @observable posts = []
  @observable fetched = false
  @observable updating = false

  @action fetch() {
    this.fetched = false
    popsicle
      .get(`${config.apiUrl}/posts`)
      .use(popsicle.plugins.parse('json'))
      .then((res) => {
        console.info(res)
        if(res.status == 200) {
          runInAction("Updating posts from server response" , () => {
            res.body.map((post) => {
              console.info(this)
              this.posts.push(new Post(post.id, post.title, post.content, post.createdAt))
            })
            this.fetched = true;
            this.lastError = null;
          });
        } else {
          runInAction("Error fetching posts", () => {
            this.lastError = "Couldn't fetch posts";
          });
        }
      })
  }
  @action createPost(fields, success) {
    this.updating = true
    popsicle
      .post({
        url: `${config.apiUrl}/posts`,
        body: fields })
      .use(popsicle.plugins.parse('json'))
      .then((res) => {
        if(res.status == 200) {
          const post = res.body
          const newPost = new Post(post.id, post.title, post.content, post.createdAt);
          runInAction("Adding newly created post to collection", () => {
            this.posts.push(newPost);
            this.updating = false;
            this.lastError = null;
          })
          success(newPost)
        } else {
          runInAction("Error creating post", () => {
            this.lastError = "Error creating post"
            this.updating = false
          })
        }
      })
  }

  updatePost(id, fields) {
    // Call API
    // Update post on success
  }

  deletePost(id) {
    // Call API
    // Update posts on success
  }

}