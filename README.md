# Seehund

Seehund creates serverless blogs in AWS.

## Why Seehund?

Publish a blog on your own domain without paying a SAAS provider or configuring Wordpress hosting.

## Getting started

[Create an AWS account](https://aws.amazon.com/console/)

[Install the AWS CLI](https://aws.amazon.com/cli/)

```shell
git checkout https://github.com/writercoder/seehund
cd seehund
yarn
bin/seehund create "My awesome blog"
```

Then set an email and password when prompted.

```shell
bin/seehund list
bin/seehund admin -b my-awesome-blog
```

This should open a browser with your brand new blog.

## Setting a custom domain

Your blog will be available at a cloudfront default domain which is something like https://dtshnk17u74uz.cloudfront.net/

To set a custom domain, there are a few steps to take.


### 1. Register a domain

You can use Amazon Route 53 for this or your registrar of choice. Using Amazon Route 53 makes certificate validation easier.

### 2. Configure a SSL Certificate

Use Amazon Certificate Manager to create or upload a certificate. It must be valid for the domain you want to use. Make a note of the certificate ARN as you will need it in the next step.

### 3. Configure Seehund to use the new domain and certificate

Run the command,

```shell
bin/seehund set_web_domain -d blog.mydomain.com -c <Cerftificate ARN>
```

Now your blog should be available at https://blog.mydomain.com

### 4. Set up DNS

You need to create a cname record and point it to the Cloudfront distribution hosting your blog. This is **NOT** the url hosting the admin panel as Seehund uses different CloudFront distributions for front and back end. Instead you can find the url on the Dashboard of your blog.

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
