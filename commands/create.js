const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');

const naming = require('./naming');
const { getCoreStackConfig, getApiUrl } = require('./get-config');

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

  createCore({title, blogName, region}, (err, data) => {
    if(err) return callback(err);

    console.log('CREATED CORE STACK');

    getCoreStackConfig({blogName, region}, (err, config) => {
      if(err) return callback(err);

      console.log('GOT STACK CONFIG');
      console.info(config)

      installApi({
        blogName,
        region,
        webBucketName: config.SeeBlogWebBucketName
      }, (err) => {
        if(err) return callback(err);

        console.log('INSTALLED API');

        getApiUrl({
          blogName,
          region,
          webBucketName: config.SeeBlogWebBucketName
        }, (err, blogApiUrl) => {
          if(err) return callback(err);

          console.log('GOT API URL');
          console.info(blogApiUrl)

          const buildAdminConfig = {
            blogName,
            region,
            blogApiUrl,
            bucketName: config.SeeBlogWebBucketName,
            appClientId: config.SeeBlogAdminAppClientId,
            userPoolId: config.SeeBlogAdminUserPoolId
          }

          buildAdmin(buildAdminConfig, (err, data) => {
            if(err) return callback(err);
            console.log('BUILT ADMIN');
            uploadAdmin({
              blogName,
              bucketName: config.SeeBlogWebBucketName}, (err) => {
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
