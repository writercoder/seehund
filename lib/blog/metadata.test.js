const sinon = require('sinon');
const AWSMock = require('aws-sdk-mock');
const AWS = require('aws-sdk');
AWSMock.setSDKInstance(AWS);

const metadata = require('./metadata');

const bucketName = "testy-test";

describe("metadata", () => {

  afterEach(() => {
    AWSMock.restore('S3');
  });

  test('getValue reads key from s3', async () => {
    AWSMock.mock("S3", "getObject", {Body: Buffer.from("Panda tales")})

    const title = await metadata.getValue({key: 'title', bucketName});

    expect(title).toBe("Panda tales");
  });


  test('setValue uploads to S3', async() => {
    const putObjectFake = sinon.fake.yields(null, {});
    AWSMock.mock("S3", "putObject", putObjectFake);

    const value = "Tigers I have known"

    const expectedParams = {
      Bucket: bucketName,
      Key: 'meta/title',
      Body: value
    };

    const result = await metadata.setValue({bucketName, key: 'title', value});

    expect(putObjectFake.calledWith(expectedParams)).toBe(true)
  });


  test('getKeys returns object keys from S3', async () => {
    AWSMock.mock("S3", "listObjectsV2", {Contents: [{Key: 'title'}, {Key: 'desc'}]});

    const result = await metadata.getKeys({bucketName});

    expect(result).toEqual(['title', 'desc']);
  });

  test('get returns all metadata', async () => {
    AWSMock.mock("S3", "listObjectsV2", {Contents: [{Key: 'title'}, {Key: 'desc'}]});

    AWSMock.mock("S3", "getObject", {Body: Buffer.from("Panda tales")})

    const result = await metadata.get({bucketName});

    expect(result).toEqual({title: "Panda tales", desc: "Panda tales"});
  });


  test('set sets all keys', async () => {
    const putObjectFake = sinon.fake.yields(null, {});
    AWSMock.mock("S3", "putObject", putObjectFake);

    await metadata.set({
      bucketName,
      data: {title: "Bad times", desc: "My fall from grace"}
    });

    expect(putObjectFake.callCount).toEqual(2)
  });

});
