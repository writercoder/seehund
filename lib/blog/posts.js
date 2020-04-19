const AWS = require('aws-sdk');
const shortid = require('shortid');
const slugify = require('slugify');
const {getDocumentClient} = require('../../lib/dynamodb')

async function all({postsTableName}) {
  const dynamoDb = getDocumentClient()

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
  const dynamoDb = getDocumentClient()

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
  const dynamoDb = getDocumentClient()

  if(!slug) {
    slug = slugify(title, {lower: true});
  }

  const post = {
    id: shortid.generate(),
    title: title,
    slug: slug,
    content: content,
    createdAt: new Date().getTime()
  }

  const params = {
    TableName: postsTableName,
    Item: post
  }

  return new Promise((resolve, reject) => {
    dynamoDb.put(params, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(post);
      }
    });
  });

}

module.exports = { all, find, create };
