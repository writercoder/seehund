import config from './../config.js'


export class BlogStore {

  frontendUrl() {
    return config.frontendUrl
  }

  webCDNDomain() {
    return config.webCDNDomain
  }

  usingCustomDomain() {
    return this.frontendUrl().includes(this.webCDNDomain())
  }
}
