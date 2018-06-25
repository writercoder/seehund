import AWS from 'aws-sdk'
import each from 'async/each';
import {renderPost, renderIndexPage} from './theme.js'

AWS.config.update({region:'us-east-1'});
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

const bucket = process.env.WEB_BUCKET;
const postsTableName = process.env.POSTS_TABLE;

export function build(callback) {
  const params = {
    TableName: postsTableName
  }

  dynamoDb.scan(params, async (error, data) => {
    if(error) {
      error.message = "Couldn't scan dynamoDb"
      callback(error)
    } else {
      try {
        await writePosts(data.Items)
        await writeIndex(data.Items)
        // await removeStalePosts(data.Items)
        callback(null)
      } catch(e) {
        callback({ message: "Error writing posts", exception: e })
      }
    }
  })
}

export async function buildPost(post) {
  await writePost(post)
  return writeIndex()
}

export async function removePost(post) {
  await deletePost(post)
  return writeIndex()
}

async function writeIndex(posts) {
  const html = renderIndexPage(posts)

  const params = {
    Bucket: bucket,
    Key: 'index.html',
    Body: html,
    ContentType: 'text/html'
  }

  return s3Put(params)
}


async function writePost(postData) {
  const html = renderPost(postData)

  const params = {
    Bucket: bucket,
    Key: `posts/${postData.id}.html`,
    Body: html,
    ContentType: 'text/html'
  }

  return s3Put(params);
}

async function writePosts(posts) {
  return Promise.all(posts.map((post) => { writePost(post) }))
}

async function removeStalePosts(posts) {
  const written = await existingPosts()
  const valid = posts.map((p) => p.id)

  const stale = written.filter((p) => !valid.includes(p));

  return destroyPosts(stale);
}

async function s3Put(params) {
  const promise = new Promise((resolve, reject) => {
    s3.putObject(params, (err, data) => {
      if(err) {
        reject(err)
      } else {
        resolve(data);
      }
    });
  })
  return promise;
}

async function destroyPosts(postIds) {
  const params = {
    Bucket: bucket,
    Delete: {
      Objects: postIds.map((id) => { Key: `posts/${id}` })
    }
  }

  const promise = new Promise((resolve, reject) => {
    s3.deleteObject(params, (err, data) => {
      if(err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
  return promise;
}

// async function existingPosts() {
//   const params = {
//     Bucket: bucket,
//     Prefix: 'posts/'
//   }

//   const promise = new Promise((resolve, reject) => {
//     s3.listObjectsV2(params, (err, data) => {
//       if(err) {
//         reject(err)
//       } else {
//         resolve(data.Content.map((item) => item.key.replace(/^posts\//, '')))
//       }
//     })
//   }
//   return promise;
// }
