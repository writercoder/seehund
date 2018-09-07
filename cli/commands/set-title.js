const AWS = require('aws-sdk');
const { getCoreStackConfig } = require('../../lib/stack/config');
const { setMetadata } = require('../../lib/blog/metadata');

const setTitle = async ({
  blogName,
  title,
  region
}, callback) => {


  const { SeeBlogWebBucketName } = await getCoreStackConfig({blogName})

  await setMetadata({
    bucketName: SeeBlogWebBucketName,
    key: 'title',
    value: title
  });

};

module.exports = setTitle;
