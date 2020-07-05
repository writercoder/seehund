import userReducer, {initialState} from "./userReducer";

const userToken = '1232434324332'
const cognitoUser = {}

export const initialUser = userReducer(initialState, {})
export const loggedOutUser = userReducer(initialUser, {type: 'INITIALIZED'})
export const authenticatingUser = userReducer(initialUser, {type: 'LOGIN'})
export const authenticatedUser = userReducer(
  authenticatingUser,
  {
    type: 'AUTHENTICATED',
    payload: {userToken, cognitoUser}
  }
)