
Seehund. Create an blog in the Cloud.

Create a serverless blog in AWS. Publish it on your own domain. Pay a small amount based on the cloud resources you use. Scale effortlessly.

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

### Development principles

* State lives in the Cloud. There is no local configuration or git repository for a blog. All its state lives in the cloud account.

### Running tests

```sh
yarn test
```
