const AWS = require('aws-sdk');

async function getMetadata({bucketName, key}) {
  const s3 = new AWS.S3();

  const params = {
    Bucket: bucketName,
    Key: `meta/${key}`
  };

  return new Promise((resolve, reject) => {
    s3.getObject(params, (error, data) => {
      if(error) return reject(error);

      resolve(data.Body.toString('utf-8'));
    })
  })
}

async function setMetadata({bucketName, key, value}) {
  const s3 = new AWS.S3();

  const params = {
    Bucket: bucketName,
    Key: `meta/${key}`,
    Body: value
  }

  return new Promise((resolve, reject) => {
    s3.putObject(params, (error) => {
      if(error) return reject(error);

      resolve(true);
    })
  });
}

module.exports = {
  getMetadata,
  setMetadata
}
