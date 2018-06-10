const AWS = require('aws-sdk');

const destroy = ({stackName, region}) => {
  const cloudformation = new AWS.CloudFormation({region});

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

module.exports = destroy;
