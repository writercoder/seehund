const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');

const shortid = require('shortid-36');
const { dasherize } = require('inflection');

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

  const blogName = dasherize(title.toLowerCase());
  const stackName = `seeblog-${blogName}`;

  let webBucketName;
  if(bucketName) {
    webBucketName = bucketName;
  } else {
    webBucketName = `${blogName}-${shortIdForS3()}`
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
    }]
  }, callback)
};


module.exports = createCoreStack;
