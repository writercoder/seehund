const AWS = require('aws-sdk');

const deleteBucket = require('./delete-bucket');
const destroyCoreStack = require('./destroy-core-stack');
const destroyApi = require('./destroy-api');

const destroy = async ({blogName, region}, callback) => {

  await deleteBucket({blogName});

  destroyCoreStack(
    {blogName, region},
    (err) => {
      if(err) return callback(err);

      destroyApi({blogName, region}, (err) => {
        if(err) return callback(err);

        callback(null)
      })
    }
  )


};

module.exports = destroy;
