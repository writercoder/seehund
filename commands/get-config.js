const AWS = require('aws-sdk');
const naming = require('./naming');

const { getSeeblogInfo, getOutputValue } = require('./stack-utils');

const getCoreStackConfig = ({blogName, region}, callback) => {

  const stackName = naming.stackName(blogName);
  const cloudformation = new AWS.CloudFormation({region});

  cloudformation.describeStacks({
    StackName: stackName
  }, (err, data) => {
      if(err) callback(err);

      const stack = data.Stacks[0];

      callback(null, getSeeblogInfo(stack))
    }
  )
};


const getApiUrl = ({blogName, region}, callback) => {
  const stackName = naming.apiStackName(blogName);
  const cloudformation = new AWS.CloudFormation({region});

  cloudformation.describeStacks({
    StackName: stackName
  }, (err, data) => {
      if(err) return callback(err);

      const stack = data.Stacks[0];

      callback(null, getOutputValue(stack, 'ServiceEndpoint'))
    }
  )
}

module.exports = { getCoreStackConfig, getApiUrl };
