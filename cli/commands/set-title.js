const AWS = require('aws-sdk');
const { getCoreStackConfig } = require('../lib/get-config');

const setTitle = ({
  blogName,
  title,
  region
}, callback) => {
  getCoreStackConfig({blogName, region}, (err, data) => {
    if(err) return callback(err);

    const s3 = new AWS.S3();

    const params = {
      Bucket: data.SeeBlogWebBucketName,
      Key: 'meta/title',
      Body: title,
      ContentType: 'text/plain'
    }

    s3.putObject(params, callback);
  });

};

module.exports = setTitle;
