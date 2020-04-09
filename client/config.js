
const config = {
  apiUrl: seeblog.blogApiUrl,
  frontendUrl: seeblog.frontendUrl,
  customDomain: seeblog.webAlias,
  webBucket: seeblog.webBucketName,
  webCDNDomain: seeblog.webCDNDomain,
  cognito: {
    appClientId: seeblog.adminAppClientId,
    userPoolId: seeblog.adminUserPoolId,
    idPoolId: seeblog.adminIdPoolId
  }
}

console.log(config)
console.log(seeblog)

export default config;
