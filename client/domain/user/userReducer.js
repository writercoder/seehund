export const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  isAuthenticating: true,
  userToken: null,
  cognitoUser: null,
  loginError: null
}

export default function reducer(state, {type, payload}) {
  switch (type) {
    case 'INITIALIZED':
      return {
        ...state,
        isInitialized: true
      }
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: false,
        isAuthenticating: true,
        cognitoUser: null
      }
    case 'LOGIN_ERROR':
      return {
        ...initialState,
        isInitialized: true,
        loginError: payload
      }
    case 'AUTHENTICATED':
      return {
        ...state,
        isAuthenticated: false,
        isAuthenticating: true,
        cognitoUser: payload.cognitoUser,
        userToken: payload.userToken
      };
    case 'LOGOUT':
      return {
        ...initialState,
        isInitialized: true
      }
    default:
      return state
  }
}
