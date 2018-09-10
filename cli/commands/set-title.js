const AWS = require('aws-sdk');
const { getCoreStackConfig } = require('../../lib/stack/config');
const metadata = require('../../lib/blog/metadata');

const setTitle = async ({
  blogName,
  title,
  region
}, callback) => {


  const { SeeBlogWebBucketName } = await getCoreStackConfig({blogName})

  await metadata.setValue({
    bucketName: SeeBlogWebBucketName,
    key: 'title',
    value: title
  });

};

module.exports = setTitle;
