import config from '../../config.js'

import {authHeader, jsonHeader, errorMessage} from "../apiHelper";

export async function load(userToken) {
  const response = await fetch(
    `${config.apiUrl}/posts`,
    {
      headers: {
        ...authHeader(userToken)
      }
    }
  )
  const parsed = await response.json()
  if(response.ok) {
    return parsed;
  } else {
    throw new Error(errorMessage('Error loading posts', response.status, parsed))
  }
}

export async function create(userToken, post) {
  const response = await fetch(
    `${config.apiUrl}/posts`, {
      method: 'POST',
      headers: {
        ...authHeader(userToken),
        ...jsonHeader()
      },
      body: JSON.stringify(post)
    }
  )
  const parsed = await response.json()
  if(response.ok) {
    return parsed
  } else {
    throw new Error(errorMessage('Error saving post', response.status, parsed))
  }
}

export async function update(userToken, post) {
  const response = await fetch(
    `${config.apiUrl}/posts/${post.id}`, {
      method: 'PUT',
      headers: {
        ...authHeader(userToken),
        ...jsonHeader()
      },
      body: JSON.stringify(post)
    }
  )
  const parsed = await response.json()
  if(response.ok) {
    return parsed
  } else {
    throw new Error(errorMessage('Error saving post', response.status, parsed))
  }
}

export async function destroy(userToken, post) {
  const response = await fetch(
    `${config.apiUrl}/posts/${post.id}`, {
      method: 'DELETE',
      headers: {
        ...authHeader(userToken),
        ...jsonHeader()
      },
      body: JSON.stringify(post)
    }
  )
  if(response.ok) {
    return true
  } else {
    throw new Error(errorMessage('Error deleting post', response.status))
  }
}



