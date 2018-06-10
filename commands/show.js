const AWS = require('aws-sdk');

const naming = require('./naming');

const { getSeeblogTags, getOutputs } = require('./stack-utils');

const showStack = ({blogName, region}) => {
  const cloudformation = new AWS.CloudFormation({region});

  const stackName = naming.stackName(blogName);

  cloudformation.describeStacks({
    StackName: stackName
  }, (err, data) => {
      const stack = data.Stacks[0];
      const info = {};
      info.tags = getSeeblogTags(stack);
      info.outputs = getOutputs(stack);
      console.info(info);
    }
  )
}

module.exports = showStack;
