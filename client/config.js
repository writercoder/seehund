

function settings(environment) {
  const configs = {
    local: {
      apiUrl: 'http://localhost:8000'
    },
    dev: {
      apiUrl: 'https://3d9pqpc5xg.execute-api.us-east-1.amazonaws.com/dev/',
      cognito: {
        appClientId: seeblog.adminAppClientId,
        userPoolId: seeblog.adminUserPoolId
      }
    }
  }
  return configs[environment];
}

function config() {
  // Localhost in url means local
  if(window.location.hostname == 'localhost') {
    return settings('dev');
  // S3 website in url means dev / staging
  } else if(window.location.hostname.includes('s3-website')) {
    return settings('dev')
  // None of these and we are in production
  } else {
    return settings('prod')
  }
}

export default config();
