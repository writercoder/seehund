const AWS = require('aws-sdk');

const naming = require('./naming');

const destroyCoreStack = ({blogName, region}) => {
  const cloudformation = new AWS.CloudFormation({region});

  const stackName = naming.stackName(blogName);

  cloudformation.deleteStack({
    StackName: stackName
  }, (err, data) => {
    if(err) {
      console.log('Error deleting stack');
      console.info(err)
    } else {
      console.log('Successfully deleted stack');
    }
  });
};

module.exports = destroyCoreStack;
