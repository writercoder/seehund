
Seehund. Create an blog in the Cloud

Create a blog in AWS with a single command. Publish to your own domain. Pay a small amount based on the cloud resources you use. Scale effortlessly.

## Getting started

[Create an AWS account](https://aws.amazon.com/console/)

[Install the AWS CLI](https://aws.amazon.com/cli/)

```
npm install -g seehund
seehund create "My awesome blog" myawesome.blog
```

Visit https://myawesome.blog/admin and start posting.

## Developing

* Clone this repository
* Create an aws account
* Set `AWS_PROFILE` and `AWS_REGION` environment variables.

### Working on the frontend

* Create a backend to work on
```sh
bin/seehund create "My dev backend"
```
* Set some environment variables
```sh
eval $(bin/seehund env my-dev-backend)
```
* Start the dev server
```sh
yarn start
```
* Browse the admin interface at http://localhost:8088/admin


