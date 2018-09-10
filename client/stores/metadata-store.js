import {action, observable, observe, runInAction} from 'mobx';
const popsicle = require('popsicle')

import config from './../config.js';

export class MetadataStore {
  @observable metadata = null;

  constructor(userStore) {
    this.userStore = userStore;
    observe(this.userStore, 'userToken', () => {
      this.fetch()
    }, true);
  }

  @action fetch() {
    this.fetched = false;
    popsicle
      .get({
        url: `${config.apiUrl}/metadata`,
        headers: this.authHeaders() })
      .use(popsicle.plugins.parse('json'))
      .then((res) => {
        if(res.status == 200) {
          runInAction("Updating metadata from server response" , () => {
            this.metadata = res.body
            this.fetched = true;
            this.lastError = null;
          });
        } else {
          runInAction("Error fetching posts", () => {
            this.lastError = "Couldn't fetch metadata";
          });
        }
      });
  }

  authHeaders() {
    return {
      Authorization: this.userStore.userToken
    };
  }
}
