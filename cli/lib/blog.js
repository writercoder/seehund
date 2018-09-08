const { getCoreStackConfig, getApiUrl } = require('../../lib/stack/config');
const { getMetadata } = require('../../lib/blog/metadata');

class Blog {

  constructor({name, region}) {
    this.name = name;
    this.region = region;
    this.fetchedCoreStackConfig = false;
    this.fetchedApiStackConfig = false;
  }

  config() {
    const config = {
      name: this.name,
      region: this.region,
      title: this.title
    };
    if(this.fetchedCoreStackConfig) {
      Object.assign(config, {
        webBucketName: this.webBucketName,
        webUrl: this.webUrl,
        adminUrl: this.adminUrl,
        adminUserPoolId: this.adminUserPoolId,
        adminAppClientId: this.adminAppClientId,
        adminUserPoolArn: this.adminUserPoolArn
      })
    }
    if(this.fetchedApiStackConfig) {
      Object.assign(config, {
        blogApiUrl: this.blogApiUrl,
      })
    }
    return config;
  }

  async fetchCoreStackConfig() {
    if(this.fetchedCoreStackConfig) {
      return;
    }

    const args = {
      blogName: this.name,
      region: this.region
    };

    const config = await getCoreStackConfig({blogName: this.name});

    this.fetchedCoreStackConfig = true;
    this.webBucketName = config.SeeBlogWebBucketName;
    this.webUrl = config.SeeBlogWebBucketUrl;
    this.adminUrl = `${config.SeeBlogWebBucketUrl}/admin/`;
    this.adminUserPoolId = config.SeeBlogAdminUserPoolId;
    this.adminUserPoolArn = config.SeeBlogAdminUserPoolArn;
    this.adminAppClientId = config.SeeBlogAdminAppClientId;
  }

  async fetchApiStackConfig() {
    if(this.fetchedApiStackConfig) {
      return;
    }

    this.blogApiUrl = await getApiUrl({blogName: this.name});
    this.fetchedApiStackConfig = true;
  }

  async fetchMetadata() {
    this.title = await getMetadata({
      bucketName: this.webBucketName,
      key: 'title'
    });
  }

  async fetchConfig() {
    await this.fetchCoreStackConfig();
    await this.fetchApiStackConfig();
    await this.fetchMetadata();
  }
}

const loadBlog = async ({name, region}, callback) => {
  const blog = new Blog({name, region});
  await blog.fetchConfig();
  if(callback) {
    callback(null, blog);
  } else {
    return blog;
  }
};

module.exports = {
  Blog,
  loadBlog
}
