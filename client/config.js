
// Export a testConfig for our storybook environment so we don't have
// to define environment variables.
const testConfig = () => ({
  blogApiUrl: 'https://apiurl.test.seehund.org',
  frontendUrl: 'https://frontendurl.test.seehund.org',
  customDomain: 'https://customdomain.test.seehund.org',
  webAlias: 'test-seehund-org-web-bucket',
  webCDNDomain: 'https://webcdndomain.test.seehund.org',
  cognito: {
    appClientId: 'test-app-client-id',
    userPoolId: 'test-user-pool-id',
    idPoolId: 'test-id-pool-id'
  }
})

const liveConfig = () => ({
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
})

const config = typeof seeblog === 'undefined' ? testConfig() : liveConfig()

export default config;
