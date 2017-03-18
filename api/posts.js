import shortid from 'shortid'
import AWS from 'aws-sdk'

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
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    };

    if (error) {
      const response = {
        statusCode: 500,
        headers: headers,
        body: JSON.stringify({status: false}),
      };
      callback(null, response);
      return;
    }

    const response = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(params.Item),
    }
    callback(null, response);
  })
}