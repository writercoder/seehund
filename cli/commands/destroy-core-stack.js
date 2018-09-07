const AWS = require('aws-sdk');

const naming = require('../../lib/utils/naming');

const destroyCoreStack = ({blogName, region}, callback) => {
  const cloudformation = new AWS.CloudFormation({region});

  const stackName = naming.stackName(blogName);

  cloudformation.deleteStack({
    StackName: stackName
  }, (err, data) => {
    if(err) {
      console.log('Error deleting stack');
      callback(err)
    } else {
      cloudformation.waitFor('stackDeleteComplete', {StackName: stackName}, (err, data) => {
        if(err) callback(err);
        callback(null, data);
      })
    }
  });
};

module.exports = destroyCoreStack;
