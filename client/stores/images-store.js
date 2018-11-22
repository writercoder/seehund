import {action, observable, observe, runInAction} from "mobx";
import AWS from 'aws-sdk';

import config from './../config.js'

const IMAGE_PATH = 'content/images';

export class ImagesStore {

  @observable images = [];

  constructor(userStore) {
    this.userStore = userStore;
  }

  s3() {
    const userPool = `cognito-idp.us-east-1.amazonaws.com/${config.cognito.userPoolId}`;
    const logins = {};
    logins[userPool] = this.userStore.userToken
    AWS.config.update({
      region: 'us-east-1',
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: config.cognito.idPoolId,
        Logins: logins
      })
    });

    return new AWS.S3({
      params: {
        Bucket: config.webBucket
      }
    });
  }

  @action fetch() {
    const params = {
      Delimeter: IMAGE_PATH
    };

    this.s3().listObjects(params, (err, data) => {
      runInAction("Updating images from server response", () => {
        this.images.push(data)
      });
    });
  }

  @action uploadImage(file) {
    console.log('uploading image')
    console.log(file);
    console.info(config);
    this.s3().upload({
      Key: `${IMAGE_PATH}/${file.name}`,
      Body: file,
      ACL: 'public-read',
      IdentityPoolId: config.cognito.idPoolId
    }, (err, data) => {
      if(err) {
        console.log(err);
      } else {
        runInAction("Updating images after upload", () => {
          this.images.push(data);
        });
      }
    });
  }
}
