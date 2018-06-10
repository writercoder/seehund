const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');


const createStack = ({
  stackName,
  bucketName,
  title,
  region
}, callback) => {
  const cloudformation = new AWS.CloudFormation({region});
  const templateBody = fs.readFileSync(path.join(__dirname, '../cloudformation/seeblog.yml'), 'utf8')

  cloudformation.createStack({
    StackName: stackName,
    TemplateBody: templateBody,
    Parameters: [{
      ParameterKey: "WebBucketName",
      ParameterValue: bucketName
    }],
    Tags: [{
      Key: 'SeehundBlog',
      Value: title
    }]
  }, callback)
};


const create = ({
  title,
  stackName,
  bucketName,
  region
}) => {
  createStack({
    stackName,
    bucketName,
    title,
    region
  }, (err, data) => {
    if(err) {
      console.log('Error creating stack');
      console.info(err)
    } else {
      console.log(`Created stack with id ${data.StackId}`)
    }
  });
};


module.exports = create;
