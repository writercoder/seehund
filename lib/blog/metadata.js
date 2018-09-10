const AWS = require('aws-sdk');

async function getValue({bucketName, key}) {
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

async function setValue({bucketName, key, value}) {
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

async function getKeys({bucketName}) {
  const s3 = new AWS.S3();

  const params = {
    Bucket: bucketName,
    Prefix: 'meta'
  }

  return new Promise((resolve, reject) => {
    s3.listObjectsV2(params, (err, data) => {
      if(err) return reject(err);

      resolve(data.Contents.map(o => o.Key.replace(/^meta\//, '')));
    });
  });
}

async function get({bucketName}) {
  const keys = await getKeys({bucketName});

  console.log('KEYS');
  console.info(keys);

  const result = {};

  const promises = keys.map(async (key) => {
    result[key] = await getValue({bucketName, key});
  });

  await Promise.all(promises);

  return result;
}

async function set({bucketName, data}) {

  const promises = Object.keys(data).map(async (key) => {
    await setValue({bucketName, key, value: data[key]});
  });

  await Promise.all(promises);
}


module.exports = {
  getValue,
  setValue,
  getKeys,
  get,
  set
}
