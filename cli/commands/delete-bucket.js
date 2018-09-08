const { getCoreStackConfig } = require('../../lib/stack/config');
const { execFileSync } = require('child_process');


const deleteBucket = async ({blogName}) => {

  const data = await getCoreStackConfig({blogName});
  const bucketName = data.SeeBlogWebBucketName;

  const args = [
    's3',
    'rb',
    '--force',
    `s3://${bucketName}`
  ];

  console.log(execFileSync('aws', args).toString());
}


module.exports = deleteBucket;
