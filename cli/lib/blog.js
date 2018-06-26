const { getCoreStackConfig, getApiUrl } = require('./get-config');

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
      region: this.region
    };
    if(this.fetchedCoreStackConfig) {
      Object.assign(config, {
        webBucketName: this.webBucketName,
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

  fetchCoreStackConfig(callback) {
    if(this.fetchedCoreStackConfig) {
      return callback(null);
    }

    const args = {
      blogName: this.name,
      region: this.region
    };

    getCoreStackConfig(args, (err, data) => {
      if(err) return callback(err);

      this.fetchedCoreStackConfig = true;
      this.webBucketName = data.SeeBlogWebBucketName;
      this.adminUserPoolId = data.SeeBlogAdminUserPoolId;
      this.adminUserPoolArn = data.SeeBlogAdminUserPoolArn;
      this.adminAppClientId = data.SeeBlogAdminAppClientId;

      callback(null);
    })
  }

  fetchApiStackConfig(callback) {
    if(this.fetchedApiStackConfig) {
      return callback(null);
    }

    const args = {
      blogName: this.name,
      region: this.region
    };

    getApiUrl(args, (err, data) => {
      if(err) return callback(err);

      this.fetchedApiStackConfig = true;
      this.blogApiUrl = data;
      callback(null);
    });
  }

  fetchConfig(callback) {
    this.fetchCoreStackConfig((err) => {
      if(err) return callback(err);
      this.fetchApiStackConfig(callback);
    })
  }
}

const loadBlog = ({name, region}, callback) => {
  const blog = new Blog({name, region});
  blog.fetchConfig((err) => {
    if(err) {
      callback(err);
    } else {
      callback(null, blog)
    }
  })
};

module.exports = {
  Blog,
  loadBlog
}
