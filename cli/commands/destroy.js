const AWS = require('aws-sdk');

const deleteBucket = require('./delete-bucket');
const deleteAdminBucket = require('./delete-admin-bucket')
const destroyCoreStack = require('./destroy-core-stack');
const destroyApi = require('./destroy-api');

const destroy = async ({blogName, region}, callback) => {

  try {
    await deleteBucket({blogName});
  } catch(e) {
    console.log(`Failed to delete frontend bucket ${e.message}`)
  }
  try {
    await deleteAdminBucket({blogName});
  } catch(e) {
    console.log(`Failed to delete admin bucket ${e.message}`)
  }

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
