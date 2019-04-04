const fs = require('fs');
const path = require('path');
const posts = require('../../lib/blog/posts');


const sampleContentDir = path.join(__dirname, '..', '..', 'data', 'sample_content');

const readSampleFile = fileName => fs.readFileSync(path.join(sampleContentDir, fileName), 'utf8');

const insertSampleFile = async ({title, fileName, postsTableName}) => {
  await posts.create({
    postsTableName, 
    title,
    content: readSampleFile(fileName)
  });
}

async function loadSampleContent({blogName, region}) {

  const postsTableName = `${blogName}-postsTable`;

  await insertSampleFile({
    postsTableName,
    title: 'Welcome to your Seehund blog', 
    fileName: 'welcome.md'
  });
  await insertSampleFile({
    postsTableName,
    title: 'Personal Microservices',
    fileName: 'personal-microservices.md'
  });
  await insertSampleFile({
    postsTableName,
    title: 'Seehund Credits',
    fileName: 'credits.md'
  });
  
}

module.exports = loadSampleContent;