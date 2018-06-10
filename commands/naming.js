const { dasherize } = require('inflection');
const shortid = require('shortid-36');

const blogNameFromTitle = (title) => {
  // TODO - smart truncate on word boundaries
  return dasherize(title.toLowerCase());
}

const stackName = (blogName) => `seeblog-${blogName}`;

const genBucketName = (blogName) => {
  return `${blogName}-${shortid.generate().toLowerCase()}`
}

module.exports = {
  stackName,
  blogNameFromTitle,
  genBucketName
}
