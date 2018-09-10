
import {action, observable} from 'mobx';

export class MessagesStore {
  @observable messages = [];

  // IDs for react unique keys
  counter = 0;


  @action push({message, status}) {
    this.messages.push({message, status, id: this.counter++ })
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
