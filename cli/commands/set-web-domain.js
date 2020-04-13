const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');

const { loadBlog } = require('../lib/blog');
const naming = require('../../lib/utils/naming');

const setWebDomain = async ({
  blogName,
  region,
  domain,
  certificateArn
}) => {
  const cloudformation = new AWS.CloudFormation({region});
  const templateBody = fs.readFileSync(path.join(__dirname, '../../cloudformation/seeblog.yml'), 'utf8')

  const stackName = naming.stackName(blogName);
  const blog = await loadBlog({name: blogName, region})

  return new Promise((resolve, reject) => {

    cloudformation.updateStack({
      StackName: stackName,
      TemplateBody: templateBody,
      Capabilities: ['CAPABILITY_IAM'],
      Parameters: [
        {
          ParameterKey: "WebBucketName",
          ParameterValue: blog.webBucketName
        },
        {
          ParameterKey: "AdminBucketName",
          ParameterValue: blog.adminBucketName
        },
        {
          ParameterKey: "UserPoolName",
          ParameterValue: `${blogName}-admins`
        },
        {
          ParameterKey: "IdentityPoolName",
          ParameterValue: naming.idPoolName(blogName)
        },
        {
          ParameterKey: "CustomWebDomain",
          ParameterValue: domain
        },
        {
          ParameterKey: "WebDomainACMCertificateArn",
          ParameterValue: certificateArn
        }
      ]
    }, (error, data) => {
      if(error) return reject(error);

      const { StackId } = data;
      console.log(`Updating stack with id ${StackId}`);
      console.log('Waiting for completion');
      cloudformation.waitFor('stackUpdateComplete', { StackName: StackId }, (err, data) => {
        if(err) return reject(err);

        console.log('Stack updated!');
        resolve({StackId});
      })

    })
  })
};

module.exports = setWebDomain;
