const path = require('path');

const { loadBlog } = require('../lib/blog');
const { uploadAssets } = require('../../engine/assets')

const uploadAssetsCommand = async ({blogName, blog}) =>  {

  if(!blog) {
    blog = await loadBlog({name: blogName});
  }

  const localAssetsPath = path.resolve(__dirname, '../../themes/default/assets')

  try {
    await uploadAssets({
      localAssetsPath,
      s3Bucket: blog.webBucketName
    })
    console.log('Uploaded assets')
  } catch(e) {
    console.log('Error loading assets')
    throw(e)
  }
}

module.exports = uploadAssetsCommand;
