
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser
} from 'amazon-cognito-identity-js';
import config from "../../config";

export function loadUserFromSession() {
  const userPool = new CognitoUserPool({
    UserPoolId: config.cognito.userPoolId,
    ClientId: config.cognito.appClientId
  });
  const currentUser = userPool.getCurrentUser();

  return new Promise((resolve, reject) => {
    if(!currentUser) {
      console.log('no user')
      resolve(null)
    } else {
      currentUser.getSession((err, session) => {
        if(err) reject(err)
        console.log('loaded user')
        resolve({
          cognitoUser: currentUser,
          authToken: session.getIdToken().getJwtToken()
        })
      })
    }
  })
}

export function authenticateUser(credentials) {
  const {username, password} = credentials

  const userPool = new CognitoUserPool({
    UserPoolId: config.cognito.userPoolId,
    ClientId: config.cognito.appClientId
  });

  const authenticationData = {
    Username: username,
    Password: password
  };

  console.log({credentials, config})

  const user = new CognitoUser({ Username: username, Pool: userPool });
  const authenticationDetails = new AuthenticationDetails(authenticationData);

  return new Promise((resolve, reject) => {
    user.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
         resolve({
          userToken: result.getIdToken().getJwtToken(),
          cognitoUser: user
        })
      },
      onFailure: (error) => resolve({error})
    })
  })
}

export function logoutUser() {
  const userPool = new CognitoUserPool({
    UserPoolId: config.cognito.userPoolId,
    ClientId: config.cognito.appClientId
  });

  const currentUser = userPool.getCurrentUser();

  if (currentUser !== null) {
    currentUser.signOut();
  }
}
