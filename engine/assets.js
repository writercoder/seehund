const AWS = require('aws-sdk')
const { relative, resolve } = require('path');
const { readdir } = require('fs').promises;
const { readFileSync } = require('fs')
const mime = require('mime-types')

async function s3Put({
  s3,
  params
}) {
  const promise = new Promise((resolve, reject) => {
    s3.putObject(params, (err, data) => {
      if(err) {
        reject(err)
      } else {
        resolve(data);
      }
    });
  })
  return promise;
}

async function listFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const res = resolve(dir, dirent.name);
    return dirent.isDirectory() ? listFiles(res) : res;
  }));
  return Array.prototype.concat(...files);
}


async function uploadAssets({
  s3Bucket,
  localAssetsPath
}) {
  const s3 = new AWS.S3()
  const assetsToUpload = await listFiles(localAssetsPath)

  return Promise.all(assetsToUpload.map(filePath => {
    const params = {
      Bucket: s3Bucket,
      Key: relative(localAssetsPath, filePath),
      Body: readFileSync(filePath),
      ContentType: mime.lookup(filePath)
    }
    return s3Put({s3, params})
  }))
}

module.exports = { uploadAssets }
