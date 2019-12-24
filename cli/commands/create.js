const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');

const naming = require('../../lib/utils/naming');
const { Blog } = require('../lib/blog');
const metadata = require('../../lib/blog/metadata');

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

    console.log('Created core stack')

    await blog.fetchCoreStackConfig();

    await metadata.setValue({
      bucketName: blog.webBucketName,
      key: 'title',
      value: title
    });

    installApi({
      blog
    }, async (err) => {
      if(err) return callback(err);

      console.log('Installed API');

      await blog.fetchApiStackConfig();


      await buildAdmin({blog});
      await uploadAdmin({blog});

      createAdminUser({blogName, region}, (err) => {
        if(err) return callback(err);

        console.log('Created admin user');
      })
    })
  })
}

module.exports = create;
