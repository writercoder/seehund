import config from '../../config.js';
import popsicle from 'popsicle'
import {runInAction} from "mobx";

const authHeader = (userToken) => ({
  Authorization: userToken
})

export function loadMetadata(userToken) {
  return new Promise((resolve, reject) => {
    popsicle
      .get({
        url: `${config.apiUrl}/metadata`,
        headers: authHeader(userToken)})
      .use(popsicle.plugins.parse('json'))
      .then((res) => {
        if(res.status == 200) {
          resolve({metadata: res.body})
        } else {
          reject("Error fetching metadata")
        }
      });
  })
}

export function saveMetadata(userToken, values) {
  return new Promise((resolve, reject) => {
    popsicle
      .put({
        url: `${config.apiUrl}/metadata`,
        body: values,
        headers: authHeader(userToken) })
      .use(popsicle.plugins.parse('json'))
      .then((res) => {
        if(res.status == 200) {
          resolve(this.metadata);
        } else {
          reject("Error updating metadata")
        }
      })
  })
}
