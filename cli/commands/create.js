const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');

const naming = require('../lib/naming');
const { getCoreStackConfig, getApiUrl } = require('../lib/get-config');
const { Blog } = require('../lib/blog');

const createCore = require('./create-core-stack');
const installApi = require('./install-api');
const buildAdmin = require('./build-admin');
const uploadAdmin = require('./upload-admin');
const createAdminUser = require('./create-admin-user');


const create = ({
  title,
  region
}, callback) => {
  if (typeof blogName === 'undefined') {
    blogName = naming.blogNameFromTitle(title);
  }

  const blog = new Blog({name: blogName, region});

  createCore({title, blogName, region}, (err, data) => {
    if(err) return callback(err);

    blog.fetchCoreStackConfig((err) => {
      if(err) return callback(err);

      console.log('GOT STACK CONFIG');
      console.info(blog.config());

      installApi({
        blog
      }, (err) => {
        if(err) return callback(err);

        blog.fetchApiStackConfig((err) => {
          if(err) return callback(err);

          console.log('GOT API CONFIG');
          console.info(blog.blogApiUrl)

          const buildAdminConfig = {
            blogName,
            region,
            blogApiUrl: blog.blogApiUrl,
            bucketName: blog.webBucketName,
            appClientId: blog.adminAppClientId,
            userPoolId: blog.adminUserPoolId
          }

          buildAdmin(buildAdminConfig, (err, data) => {
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
    })
  })
}

module.exports = create;
