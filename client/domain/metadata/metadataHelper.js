import config from '../../config.js';
import popsicle from 'popsicle'
import {authHeader} from "../apiHelper";

export async function loadMetadata(userToken) {
  const response = await fetch(
    `${config.apiUrl}/metadata`,
    {
      headers: {
        ...authHeader(userToken)
      }
    }
  )
  return response.json()
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
