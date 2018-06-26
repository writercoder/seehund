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

  constructor(userStore) {
    this.userStore = userStore;
  }

  getPost(id) {
    return this.posts.find((p) => p.id == id)
  }

  @action fetch() {
    this.fetched = false
    popsicle
      .get({
        url: `${config.apiUrl}/posts`,
        headers: this.authHeaders() })
      .use(popsicle.plugins.parse('json'))
      .then((res) => {
        if(res.status == 200) {
          runInAction("Updating posts from server response" , () => {
            this.posts = []
            res.body.map((post) => {
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
        body: fields,
        headers: this.authHeaders() })
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

  @action updatePost(id, fields, callback) {
    this.updating = true
    popsicle
      .put({
        url: `${config.apiUrl}/posts/${id}`,
        body: fields,
        headers: this.authHeaders()
      })
    .use(popsicle.plugins.parse('json'))
    .then((res) => {
      if(res.status == 200) {
        const postRes = res.body
        const post = new Post(postRes.id, postRes.title, postRes.content, postRes.createdAt);
        const postIndex = this.posts.findIndex((p) => p.id == post.id)
        runInAction(`Updating Post ${post.id}:: ${post.title} from server`, () => {
          this.posts[postIndex] = post
          this.updating = false
          this.lastError = null
        })
        if(!!callback) callback();
      } else {
        runInAction("Error creating post", () => {
          this.lastError = "Error creating post"
          this.updating = false
        })
      }
    })
  }

  @action deletePost(id) {
    this.updating = true
    popsicle
      .del({
        url: `${config.apiUrl}/posts/${id}`,
        headers: this.authHeaders()
      })
    .use(popsicle.plugins.parse('json'))
    .then((res) => {
      if(res.status == 200) {
        const post = this.posts.find(p => p.id == id);
        runInAction(`Deleting Post ${id}`, () => {
          this.posts.remove(post);
          console.info(this.posts);
          this.updating = false
          this.lastError = null
        })
      } else {
        runInAction("Error creating post", () => {
          this.lastError = "Error deleting post"
          this.updating = false
        })
      }
    })
  }

  authHeaders() {
    return {
      Authorization: this.userStore.userToken
    };
  }

}
