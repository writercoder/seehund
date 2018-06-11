const path = require('path');
const { execFileSync } = require('child_process');

const uploadAdmin = ({blogName, bucketName}, callback) =>  {

  const args = [
    's3',
    'sync',
    path.resolve(__dirname, `../dist/${blogName}`),
    `s3://${bucketName}`
  ];

  console.log(execFileSync('aws', args).toString());
  callback(null)
}

module.exports = uploadAdmin;
