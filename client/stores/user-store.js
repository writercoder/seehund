import {action, observable, runInAction, computed} from "mobx";
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser
} from 'amazon-cognito-identity-js';
import config from './../config.js'


export class UserStore {

  @observable userToken;
  @observable loggedInUser;
  @observable loginError;

  constructor() {
    this.loadUserFromSession();
  }

  @action login(username, password) {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.userPoolId,
      ClientId: config.cognito.appClientId
    });

    const authenticationData = {
      Username: username,
      Password: password
    };

    const user = new CognitoUser({ Username: username, Pool: userPool });
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    user.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.info(result)
        runInAction("Logged user in", () => {
          this.userToken = result.getIdToken().getJwtToken();
        })
      },
      onFailure: (err) => runInAction("Error logging user in", () => {
        this.loginError = err;
      })
    })
  }

  @action logout() {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.userPoolId,
      ClientId: config.cognito.appClientId
    });

    const currentUser = userPool.getCurrentUser();

    if (currentUser !== null) {
      currentUser.signOut();
    }

    this.userToken = null
  }

  @computed get loggedIn() {
    return !!this.userToken;
  }

  @action loadUserFromSession() {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.userPoolId,
      ClientId: config.cognito.appClientId
    });
    const currentUser = userPool.getCurrentUser();

    console.info(currentUser)

    currentUser.getSession((err, session) => {
      if(err) {
        return;
      }
      runInAction("Logged user in from session", () => {
        this.userToken = session.getIdToken().getJwtToken();
      });

    });
  }
}