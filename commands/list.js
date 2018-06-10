const AWS = require('aws-sdk');

const getTag = (stack, key) => {
  return stack.Tags.find(tag => tag.Key == key);
}

const getSeeblogTags = (stack) => {
  const seeblogTag = getTag(stack, 'seeblog');
  if(!seeblogTag) {
    return null;
  }

  const titleTag = getTag(stack, 'seeblog-title');

  return {
    seeblog: seeblogTag.Value,
    seeblogTitle: titleTag.Value
  }
}

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
