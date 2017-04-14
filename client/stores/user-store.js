import {action, observable, runInAction, computed} from "mobx"
const popsicle = require('popsicle')
import config from './../config.js'

export class UserStore {

  @observable userToken;

  @action login(email, password) {

  }

  @action logout() {

  }

  @computed get loggedIn() {
    return !!this.userToken;
  }
}