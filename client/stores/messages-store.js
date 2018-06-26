
import {action, observable} from 'mobx';

export class MessagesStore {
  @observable messages = [];


  @action push({message, status}) {
    console.log('pushing a message ' + message);
    this.messages.push({message, status})
  }

  okay(message) {
    this.push({message, status: 'ok'})
  }

  warn(message) {
    this.push({message, status: 'warning'})
  }

  critical(message) {
    this.push({message, status: 'critical'})
  }

  @action clear() {
    this.messages.clear();
  }
}
