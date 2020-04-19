const AWS = require('aws-sdk');
// TODO: Get region from config
AWS.config.update({region: 'us-east-1'});

function getDocumentClient() {
  if(process.env.IS_OFFLINE) {
    return new AWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000',
      accessKeyId: 'DEFAULT_ACCESS_KEY',
      secretAccessKey: 'DEFAULT_SECRET'
    })
  } else {
    AWS.config.update({region: 'us-east-1'});
    return new AWS.DynamoDB.DocumentClient()
  }
}

module.exports = { 
  getDocumentClient 
}
