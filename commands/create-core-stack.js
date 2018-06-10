const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');


const naming = require('./naming');

const shortIdForS3 = () => {
  return shortid.generate().toLowerCase()
}

const createCoreStack = ({
  title,
  bucketName,
  region
}, callback) => {
  const cloudformation = new AWS.CloudFormation({region});
  const templateBody = fs.readFileSync(path.join(__dirname, '../cloudformation/seeblog.yml'), 'utf8')

  const blogName = naming.blogNameFromTitle(title);
  const stackName = naming.stackName(blogName);

  let webBucketName;
  if(bucketName) {
    webBucketName = bucketName;
  } else {
    webBucketName = naming.genBucketName(blogName);
  }

  cloudformation.createStack({
    StackName: stackName,
    TemplateBody: templateBody,
    Parameters: [{
      ParameterKey: "WebBucketName",
      ParameterValue: webBucketName
    }],
    Tags: [{
      Key: 'seeblog',
      Value: blogName
    }, {
      Key: 'seeblog-title',
      Value: title
    }]
  }, callback)
};


module.exports = createCoreStack;
