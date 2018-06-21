const AWS = require('aws-sdk');

const deleteBucket = require('./delete-bucket');
const destroyCoreStack = require('./destroy-core-stack');
const destroyApi = require('./destroy-api');

const destroy = ({blogName, region}, callback) => {

  deleteBucket({blogName, region}, (err) => {
    if(err) return callback(err);
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
  })

};

module.exports = destroy;
