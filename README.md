# Seehund - Own Your Digital Self

Seehund is a graceful and elegant seal swimming through the clouds. She lives to provide you with these blessings.

* Data autonomy. Your stories, photos and contact list live in storage space you have paid for.

* Data reliablity. Never lose a photo or contact.

* Great value. Public clouds make it possible to be as performant and efficient as Facebook.

## Features

* Publish a blog on the web
* Interact with friends - COMING SOON
* Share content with other networks - COMING  SOON
* Manage photos and contacts - COMING SOON
* Multi Cloud Support - COMING SOON
* Simple installer - COMING SOON
* Mobile apps - COMING SOON

## Installation - COMING SOON

```sh
yarn install seehund --global
seehund create "My lovely blog"
```

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

### Working on the API

* Running lambda functions locally - TO DOCUMENT
* Testing the API - TO DOCUMENT

### Working on the CLI

* TO DOCUMENT
