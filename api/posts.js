import shortid from 'shortid'
import AWS from 'aws-sdk'
import { fail, succeed } from './lib/respond'
import { build, asyncBuild } from './../engine/builder'
import libposts from '../lib/blog/posts'

AWS.config.update({region: process.env.AWS_REGION});
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const postsTableName = process.env.POSTS_TABLE;

export async function create(event, context, callback) {
  const data = JSON.parse(event.body);

  try {
    const post = await libposts.create({
      postsTableName,
      title: data.title,
      slug: data.slug,
      content: data.content
    })
    await asyncBuild();
    succeed(post, callback);
  } catch(e) {
    fail(e, callback);
  }
}

export function show(event, context, callback) {

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
      build((error) => {
        if(error) {
          fail(error, callback);
        } else {
          succeed(data.Attributes, callback);
        }
      })
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
