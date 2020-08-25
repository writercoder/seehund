import config from "../../config";
import AWS from "aws-sdk";
import {runInAction} from "mobx";
const IMAGE_PATH = 'content/images';

function s3(userToken) {
  const userPool = `cognito-idp.us-east-1.amazonaws.com/${config.cognito.userPoolId}`;

  AWS.config.update({
    region: 'us-east-1',
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: config.cognito.idPoolId,
      Logins: {[userPool]: userToken}
    })
  });

  return new AWS.S3({
    params: {
      Bucket: config.webBucket
    }
  });
}

export async function load(userToken){
  const params = {
    Delimeter: IMAGE_PATH
  };

  return new Promise((resolve, reject) => {
    s3(userToken).listObjects(params, (err, data) => {
      if(err) {
        reject(err)
      } else {
        resolve(data)
      }
    });
  })
}


export async function upload(userToken, image){
  return new Promise((resolve, reject) => {
    s3(userToken).upload({
      Key: `${IMAGE_PATH}/${file.name}`,
      Body: file,
      ACL: 'public-read',
      IdentityPoolId: config.cognito.idPoolId
    }, (err, data) => {
      if(err) {
        reject(err)
      } else {
        resolve(data)
      }
    });
  })
}