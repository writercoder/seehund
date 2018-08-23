const sinon = require('sinon');
const AWSMock = require('aws-sdk-mock');
const AWS = require('aws-sdk');
AWSMock.setSDKInstance(AWS);

const { getMetadata, setMetadata } = require('./metadata')

const bucketName = "testy-test";

test('getMetadata reads key from s3', async () => {
  AWSMock.mock("S3", "getObject", {Body: Buffer.from("Panda tales")})

  const title = await getMetadata({key: 'title', bucketName});

  expect(title).toBe("Panda tales");
});


test('setMetadata uploads to S3', async() => {
  const putObjectFake = sinon.fake.yields(null, {});
  AWSMock.mock("S3", "putObject", putObjectFake);

  const value = "Tigers I have known"

  const expectedParams = {
    Bucket: bucketName,
    Key: 'meta/title',
    Body: value
  };

  const result = await setMetadata({bucketName, key: 'title', value});

  expect(putObjectFake.calledWith(expectedParams)).toBe(true)
});
