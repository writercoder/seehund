const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');

const naming = require('../../lib/utils/naming');
const { getCoreStackConfig, getApiUrl } = require('../lib/get-config');
const { Blog } = require('../lib/blog');
const { setMetadata } = require('../../lib/blog/metadata');

const createCore = require('./create-core-stack');
const installApi = require('./install-api');
const buildAdmin = require('./build-admin');
const uploadAdmin = require('./upload-admin');
const createAdminUser = require('./create-admin-user');


const create = async ({
  title,
  region
}, callback) => {
  if (typeof blogName === 'undefined') {
    blogName = naming.blogNameFromTitle(title);
  }

  const blog = new Blog({name: blogName, region});

  createCore({title, blogName, region}, async (err, data) => {
    if(err) return callback(err);

    await blog.fetchCoreStackConfig();

    console.log('GOT STACK CONFIG');
    console.info(blog.config());

    await setMetadata({
      bucketName: blog.webBucketName,
      key: 'title',
      value: title
    });

    installApi({
      blog
    }, async (err) => {
      if(err) return callback(err);

      await blog.fetchApiStackConfig();

      console.log('GOT API CONFIG');

      buildAdmin(blog, (err, data) => {
        if(err) return callback(err);
        console.log('BUILT ADMIN');
        uploadAdmin({
          blogName,
          bucketName: blog.webBucketName
        }, (err) => {
            if(err) return callback(err);
            console.log('UPLOADED ADMIN')
            createAdminUser({blogName, region}, (err) => {
              if(err) return callback(err);

              console.log('CREATED ADMIN USER');
            })
          })
      })
    })

  })
}

module.exports = create;
