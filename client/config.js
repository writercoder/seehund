

function settings(environment) {
  const configs = {
    local: {
      apiUrl: 'http://localhost:8000'
    },
    dev: {
      apiUrl: seeblog.blogApiUrl,
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
