const AWS = require('aws-sdk');

const getSeehundBlog = (stack) => {
  const seehundTag = stack.Tags.find(tag => tag.Key === "SeehundBlog");

  if(seehundTag) {
    return seehundTag.Value;
  }
};

const listStacks = ({region}) => {
  const cloudformation = new AWS.CloudFormation({region});

  cloudformation.describeStacks({}, (err, data) => {
    if(err) {
      console.log('Error listing stacks');
      console.info(err)
    } else {
      data.Stacks.forEach(stack => {
        const blog = getSeehundBlog(stack);
        if(blog) {
          console.log(blog);
        }
      });
    }
  })
}


module.exports = listStacks;
