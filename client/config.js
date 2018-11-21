import AWS from 'aws-sdk';

const config = {
  apiUrl: seeblog.blogApiUrl,
  frontendUrl: seeblog.frontendUrl,
  webBucket: seeblog.webBucketName,
  cognito: {
    appClientId: seeblog.adminAppClientId,
    userPoolId: seeblog.adminUserPoolId,
    idPoolId: seeblog.adminIdPoolId
  }
}

export default config;
