const { teardown: teardownDevServer } = require('jest-dev-server')

module.exports = async function globalTeardown() {
  if(process.env.CI) {
    return
  }
  await teardownDevServer()
}