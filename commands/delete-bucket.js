const { getCoreStackConfig } = require('./get-config');
const { execFileSync } = require('child_process');


const deleteBucket = ({blogName, region}, callback) => {
  getCoreStackConfig({blogName, region}, (err, data) => {
    if(err) return callback(err);

    const bucketName = data.SeeBlogWebBucketName;

    const args = [
      's3',
      'rb',
      '--force',
      `s3://${bucketName}`
    ];

    console.log(execFileSync('aws', args).toString());
    callback(null)
  });
}


module.exports = deleteBucket;
