export const authHeader = (userToken) => ({
  Authorization: userToken
})

export const jsonHeader = () => ({
  'Content-Type': 'application/json'
})

export const errorMessage = (prefix, status, response) => {
  const stem = `${prefix}. Server responded with status: ${status}`
  if(response.error) {
    return `${stem} message: ${response.error}`
  } else {
    return stem
  }
}
