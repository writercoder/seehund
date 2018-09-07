const sinon = require('sinon');
const AWSMock = require('aws-sdk-mock');
const AWS = require('aws-sdk');
AWSMock.setSDKInstance(AWS);

const naming = require('../utils/naming');
const cfUtils = require('../utils/cloudformation');
const { getCoreStackConfig, getApiUrl } = require('./config');



test("getCoreStackConfig returns data from cloudformation", async () => {

  const blogName = 'trees-of-finland';

  const expectedResult = {
    faked: 'Some fake stuff'
  };

  AWSMock.mock("CloudFormation", "describeStacks", {Stacks: ['fake']});

  const fakeInfo = sinon.fake.returns(expectedResult);
  sinon.replace(cfUtils, 'getSeeblogInfo', fakeInfo);

  const config = await getCoreStackConfig(blogName);

  expect(config).toEqual(expectedResult);
});


test("getApiUrl returns data from cloudformation", async () => {
  const blogName = 'trees-of-finland';

  const expectedResult = 'https://puddings.example.com';

  AWSMock.mock("CloudFormation", "describeStacks", {Stacks: ['fake']});

  const fakeOutput = sinon.fake.returns(expectedResult);
  sinon.replace(cfUtils, 'getOutputValue', fakeOutput);

  const url = await getApiUrl(blogName);

  expect(url).toEqual(expectedResult);
});
