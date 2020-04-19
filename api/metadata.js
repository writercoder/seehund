const metadata = require('../lib/blog/metadata');
const { fail, succeed } = require('./lib/respond');
import { build } from './../engine/builder'

const bucketName = process.env.WEB_BUCKET;

export async function get(event, context, callback) {

  try {
    const data = await metadata.get({bucketName});
    succeed(data, callback);
  } catch(e) {
    fail([`Failed getting metadata: ${e.message}`],callback);
  }
}

export async function set(event, context, callback) {
  const payload = JSON.parse(event.body);

  try {
    await metadata.set({bucketName, data: payload});
    const newMetadata = await(metadata.get({bucketName}));
    succeed(newMetadata, callback);
    build(error => {
      if(error) {
        fail(error, callback);
      } else {
        succeed(newMetadata, callback);
      }
    });
  } catch(e) {
    fail(e, callback);
  }
}
