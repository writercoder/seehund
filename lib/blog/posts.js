const AWS = require('aws-sdk');
const shortid = require('shortid');
const slugify = require('slugify');

AWS.config.update({region: 'us-east-1'});


async function all({postsTableName}) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: postsTableName
  }

  return new Promise((resolve, reject) => {
    dynamoDb.scan(params, (error, data) => {
      if(error) {
        error.message = "Couldn't scan dynamoDb"
        reject(error);
      } else {
        resolve(data.Items);
      }
    })
  });
}

function find({id, postsTableName}) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: postsTableName,
    Key: {
      id: id
    }
  }

  return new Promise((resolve, reject) => {
    dynamoDb.get(params, (error, data) => {
      if(error) {
        reject(error);
      } else {
        resolve(data.Item);
      }
    })
  });
}

async function create({postsTableName, title, content, slug}) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  if(!slug) {
    slug = slugify(title, {lower: true});
  }

  const params = {
    TableName: postsTableName,
    Item: {
      id: shortid.generate(),
      title: title,
      slug: slug,
      content: content,
      createdAt: new Date().getTime()
    }
  }

  return new Promise((resolve, reject) => {
    dynamoDb.put(params, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data.Attributes);
      }
    });
  });

}

module.exports = { all, find, create };
