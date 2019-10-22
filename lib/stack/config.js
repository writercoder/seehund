const AWS = require('aws-sdk');
const naming = require('../utils/naming');
const cfUtils = require('../utils/cloudformation');

const getCoreStackConfig = async ({blogName}) => {
  const cloudformation = new AWS.CloudFormation();

  return new Promise((resolve, reject) => {
    const stackName = naming.stackName(blogName);
    cloudformation.describeStacks({
      StackName: stackName
    }, (err, data) => {
        if(err) return reject(err);
        const stack = data.Stacks[0];

        resolve(cfUtils.getSeeblogInfo(stack))
      }
    )
  });
};

const getApiUrl = async ({blogName}) => {
  const cloudformation = new AWS.CloudFormation();
  const stackName = naming.apiStackName(blogName);

  return new Promise((resolve, reject) => {
    cloudformation.describeStacks({
      StackName: stackName
    }, (err, data) => {
        if(err) reject(err)

        const stack = data.Stacks[0];

        resolve(cfUtils.getOutputValue(stack, 'ServiceEndpoint'));
      }
    )
  });
};

module.exports = {
  getCoreStackConfig,
  getApiUrl
};
