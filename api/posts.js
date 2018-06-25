import shortid from 'shortid'
import AWS from 'aws-sdk'
import { fail, succeed } from './../lib/respond'
import { build } from './../engine/builder'

AWS.config.update({region: process.env.AWS_REGION});
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const postsTableName = process.env.POSTS_TABLE;

export function create(event, context, callback) {
  const data = JSON.parse(event.body);

  // const post = await db.createPost(data);
  // await builder.buildPost(post)

  const params = {
    TableName: postsTableName,
    Item: {
      id: shortid.generate(),
      title: data.title,
      content: data.content,
      createdAt: new Date().getTime()
    }
  }

  dynamoDb.put(params, (error, data) => {
    if (error) {
      fail(error, callback);
    } else {
      build((error) => {
        if(error) {
          fail(error, callback);
        } else {
          succeed(params.Item, callback);
        }
      })
    }
  })
}

export function show(event, context, callback) {

  // const post = await db.find(even.pathParameters.id);
  // succeed(post, callback);

  const params = {
    TableName: postsTableName,
    Key: {
      id: event.pathParameters.id
    }
  }

  dynamoDb.get(params, (error, data) => {
    if(error) {
      fail(callback);
    } else {
      succeed(data.Item, callback);
    }
  })
}

export function list(event, context, callback) {
  const params = {
    TableName: postsTableName,
  }

  dynamoDb.scan(params, (error, data) => {
    if(error) {
      fail(callback);
    } else {
      succeed(data.Items, callback);
    }
  })
}

export function update(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: postsTableName,
    Key: {
      id: event.pathParameters.id
    },
    UpdateExpression: 'SET title = :title, content = :content',
    ExpressionAttributeValues: {
      ':title': data.title ? data.title : null,
      ':content': data.content ? data.content : null,
    },
    ReturnValues: 'ALL_NEW'
  }

  dynamoDb.update(params, (error, data) => {
    if(error) {
      fail(callback);
    } else {
      succeed(data.Attributes, callback);
    }
  })
}

export function destroy(event, context, callback) {
  const params = {
    TableName: postsTableName,
    Key: {
      id: event.pathParameters.id
    }
  }
  dynamoDb.delete(params, (error, data) => {
    if(error) {
      fail(callback);
    } else {
      succeed({status: true},  callback);
    }
  })
}
