const path = require("path");
const { execFileSync } = require("child_process");

const destroyApi = ({ region, blogName }, callback) => {
  const serverlessBin = path.join(
    __dirname,
    "../../node_modules/serverless/bin/serverless"
  );

  const args = ["remove", "--region", region];
  const env = Object.assign({}, process.env, { SEEHUND_BLOG: blogName });

  console.log(execFileSync(serverlessBin, args, { env }).toString());
  callback(null);
};

module.exports = destroyApi;
