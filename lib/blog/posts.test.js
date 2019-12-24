const AWSMock = require('aws-sdk-mock');
const AWS = require('aws-sdk');
AWSMock.setSDKInstance(AWS);

const posts = require('./posts');
const postsTableName = 'fake-posts-table';

describe("posts", () => {

  afterEach(() => {
    AWSMock.restore('DynamoDB.DocumentClient');
  });

  test("all", async () => {
    const fakePosts = ['fake', 'news', 'posts'];
    AWSMock.mock("DynamoDB.DocumentClient", "scan", (params, callback) => {
      callback(null, {Items: fakePosts});
    });

    const result = await posts.all({postsTableName});

    expect(result).toEqual(fakePosts);
  });

  test("find", async () => {
    const fakePost = {title: 'Fake News', content: "We told you"};
    AWSMock.mock("DynamoDB.DocumentClient", "get", (params, callback) => {
      callback(null, {Item: fakePost});
    });

    const result = await posts.find({postsTableName, id: 'kkd'});

    expect(result).toEqual(fakePost);
  });

  test("create", async () => {
    const postData = {title: "New post", content: "New post content", slug: 'new-post-slug'};

    AWSMock.mock("DynamoDB.DocumentClient", "put", (params, callback) => {
      callback(null, {Attributes: postData});
    });

    const result = await posts.create({postsTableName, ...postData})

    expect(result).toMatchObject(postData);
  })

  test("create creates default slug", async () => {
    const postData = {title: "New post", content: "New post content"};
    const expectedResult = {slug: 'new-post', ...postData};

    AWSMock.mock("DynamoDB.DocumentClient", "put", (params, callback) => {
      callback(null, {Attributes: expectedResult});
    });

    const result = await posts.create({postsTableName, ...postData})

    expect(result).toMatchObject(expectedResult);
  })

})
