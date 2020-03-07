const { getCoreStackConfig } = require('../../lib/stack/config');
const { execFileSync } = require('child_process');


const deleteAdminBucket = async ({blogName}) => {

  const data = await getCoreStackConfig({blogName});
  const bucketName = data.SeeBlogAdminBucketName;

  const args = [
    's3',
    'rb',
    '--force',
    `s3://${bucketName}`
  ];

  console.log(execFileSync('aws', args).toString());
}


module.exports = deleteAdminBucket;
