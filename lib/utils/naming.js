const { dasherize, camelize } = require('inflection');
const shortid = require('shortid-36');

const dedasherize = (str) => str.replace(/-/g, '_');

const camelizeDashes = (str) => camelize(dedasherize(str));

const blogNameFromTitle = (title) => {
  // TODO - smart truncate on word boundaries
  return dasherize(title.toLowerCase());
}

const stackName = (blogName) => `seeblog-${blogName}`;

const apiStackName = (blogName) => `seeblog-api-${blogName}-dev`;

const genBucketName = (blogName) => {
  return `${blogName}-${shortid.generate().toLowerCase()}`
}

const idPoolName = (blogName) => `SeeblogIdPool${camelizeDashes(blogName)}`

module.exports = {
  stackName,
  apiStackName,
  blogNameFromTitle,
  idPoolName,
  genBucketName
}

