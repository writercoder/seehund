

function settings(environment) {
  const configs = {
    local: {
      apiUrl: 'http://localhost:8000'
    },
    dev: {
      apiUrl: 'https://6f9q467z21.execute-api.us-east-1.amazonaws.com/dev'
    }
  }
  return configs[environment];
}

function config() {
  // Localhost in url means local
  if(window.location.hostname == 'localhost') {
    return settings('dev');
  // S3 website in url means dev / staging
  } else if(window.localhost.includes('s3-website')) {
    return settings('dev')
  // None of these and we are in production
  } else {
    return settings('prod')
  }
}

export default config();