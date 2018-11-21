const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');

const naming = require('../../lib/utils/naming');

const shortIdForS3 = () => {
  return shortid.generate().toLowerCase()
}

const createCoreStack = ({
  title,
  blogName,
  bucketName,
  region
}, callback) => {
  const cloudformation = new AWS.CloudFormation({region});
  const templateBody = fs.readFileSync(path.join(__dirname, '../../cloudformation/seeblog.yml'), 'utf8')

  if (typeof blogName === 'undefined') {
    blogName = naming.blogNameFromTitle(title);
  }
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
    Capabilities: ['CAPABILITY_IAM'],
    Parameters: [
      {
        ParameterKey: "WebBucketName",
        ParameterValue: webBucketName
      },
      {
        ParameterKey: "UserPoolName",
        ParameterValue: `${blogName}-admins`
      },
      {
        ParameterKey: "IdentityPoolName",
        ParameterValue: naming.idPoolName(blogName)
      }
    ],
    Tags: [{
      Key: 'seeblog',
      Value: blogName
    }, {
      Key: 'seeblog-title',
      Value: title
    }]
  }, (error, data) => {
    if(error) callback(error);

    const { StackId } = data;
    console.log(`Creating stack with id ${StackId}`);
    console.log('Waiting for completion');
    cloudformation.waitFor('stackCreateComplete', { StackName: StackId }, (err, data) => {
      if(error) callback(error);
      console.log('Stack created!');
      callback(null, data);
    })

  })
};


module.exports = createCoreStack;
