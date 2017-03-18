import shortid from 'shortid'
import AWS from 'aws-sdk'
import { fail, succeed } from './../lib/respond'

AWS.config.update({region:'us-east-1'});
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export function create(event, context, callback) {
  const data = JSON.parse(event.body);

  const params = {
    TableName: 'postsTable',
    Item: {
      id: shortid.generate(),
      title: data.title,
      content: data.content,
      createdAt: new Date().getTime()
    }
  }

  dynamoDb.put(params, (error, data) => {
    if (error) {
      fail(callback);
    } else {
      succeed(callback, params.Item);
    }
  })
}

export function show(event, context, callback) {
  const params = {
    TableName: 'postsTable',
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
    TableName: 'postsTable',
  }

  dynamoDb.scan(params, (error, data) => {
    if(error) {
      fail(callback);
    } else {
      succeed(data.Items, callback);
    }
  })
}
