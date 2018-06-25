const AWS = require('aws-sdk');

const { getSeeblogTags } = require('../lib/stack-utils');


const listStacks = ({region}) => {
  const cloudformation = new AWS.CloudFormation({region});

  cloudformation.describeStacks({}, (err, data) => {
    if(err) {
      console.log('Error listing stacks');
      console.info(err)
    } else {
      data.Stacks.forEach(stack => {
        const tags = getSeeblogTags(stack);
        if(tags) {
          console.log(`${tags.seeblog} ~~ ${tags.seeblogTitle}`)
        }
      });
    }
  })
}

module.exports = listStacks;
