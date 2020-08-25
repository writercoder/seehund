import config from '../../config.js';
import popsicle from 'popsicle'
import {authHeader, errorMessage, jsonHeader} from "../apiHelper";

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

export async function update(userToken, metadata) {
  const response = await fetch(
    `${config.apiUrl}/metadata`, {
      method: 'PUT',
      headers: {
        ...authHeader(userToken),
        ...jsonHeader()
      },
      body: JSON.stringify(metadata)
    }
  )
  const parsed = await response.json()
  if(response.ok) {
    return parsed
  } else {
    throw new Error(errorMessage('Error saving metadata', response.status, parsed))
  }
}

export function saveMetadata(userToken, values) {
  console.log('saving metadata')
  console.log(values)
  return new Promise((resolve, reject) => {
    popsicle
      .put({
        url: `${config.apiUrl}/metadata`,
        body: values,
        headers: authHeader(userToken) })
      .use(popsicle.plugins.parse('json'))
      .then((res) => {
        console.log('saved')
        console.log(res)
        if(res.status == 200) {
          resolve(res);
        } else {
          reject("Error updating metadata")
        }
      })
  })
}
