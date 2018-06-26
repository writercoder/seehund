
function config() {
  return {
    apiUrl: seeblog.blogApiUrl,
    cognito: {
      appClientId: seeblog.adminAppClientId,
      userPoolId: seeblog.adminUserPoolId
    }
  }
}

export default config();
