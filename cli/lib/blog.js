const { getCoreStackConfig, getApiUrl } = require('../../lib/stack/config');
const metadata = require('../../lib/blog/metadata');

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
        webCDNDomain: this.webCDNDomain,
        webAlias: this.webAlias,
        webDomain: this.webDomain,
        webUrl: this.webUrl,
        adminBucketName: this.adminBucketName,
        adminUrl: this.adminUrl,
        adminUserPoolId: this.adminUserPoolId,
        adminAppClientId: this.adminAppClientId,
        adminUserPoolArn: this.adminUserPoolArn,
        adminIdPoolId: this.adminIdPoolId
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

    const config = await getCoreStackConfig({blogName: this.name});

    this.fetchedCoreStackConfig = true;
    this.coreStackId = config.stackId
    this.webBucketName = config.SeeBlogWebBucketName;
    
    if(config.SeeBlogCustomWebAlias) {
      this.webAlias = config.SeeBlogCustomWebAlias
      this.webDomain = this.webAlias
      this.webCDNDomain = config.SeeBlogCustomWebCDNDomain
    } else {
      this.webDomain = config.SeeBlogWebCDNDomain;
      this.webCDNDomain = config.SeeBlogWebCDNDomain;
    }
    this.webUrl = `https://${this.webDomain}`
    this.adminBucketName = config.SeeBlogAdminBucketName;
    this.adminUrl = `https://${config.SeeBlogAdminCDNDomain}`;
    this.adminUserPoolId = config.SeeBlogAdminUserPoolId;
    this.adminUserPoolArn = config.SeeBlogAdminUserPoolArn;
    this.adminIdPoolId = config.SeeBlogIdentityPoolId;
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
    this.title = await metadata.getValue({
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
