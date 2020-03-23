const AWS = require('aws-sdk');
const { getSeeblogTags } = require('../../lib/utils/cloudformation');
const destroy = require('./destroy')

const getStacks = async ({region}) => {
  const cloudformation = new AWS.CloudFormation({region});

  return new Promise((resolve, reject) => {
    cloudformation.describeStacks({}, (err, data) => {
      if(err) {
        reject(err)
      } else {
        resolve(data.Stacks)
      }
    })
  })
}

const getBlogNames = async ({region}) => {
  const stacks = await getStacks({region})

  const blogNames = [];
  stacks.forEach(stack => {
    const tags = getSeeblogTags(stack);
    if (tags) {
      blogNames.push(tags.seeblog);
    }
  })
  return blogNames;
}

const destroyAll = async ({region}) => {
  const blogs = await getBlogNames({region});
  console.info(blogs)
  return Promise.all(blogs.map(blogName => {
    return new Promise((resolve, reject) => {
      destroy({blogName, region}, err => {
        if(err) {
          reject(err)
        } else {
          resolve()
        }
      })
    });
  }))
}

module.exports = destroyAll
