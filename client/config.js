
function config() {
  return {
    apiUrl: seeblog.blogApiUrl,
    frontendUrl: seeblog.frontendUrl,
    cognito: {
      appClientId: seeblog.adminAppClientId,
      userPoolId: seeblog.adminUserPoolId
    }
  }
}

export default config();
