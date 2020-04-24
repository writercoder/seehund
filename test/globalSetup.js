const { setup: setupDevServer } = require('jest-dev-server')

module.exports = async function globalSetup() {

  const httpPort = 3030
  const lambdaPort = 3032
  const websocketPort = 3031

  process.env.IS_OFFLINE = 'true'
  const stage = process.env.STAGE || 'test'

  await setupDevServer({
    command:
      `serverless offline start ` +
      `--httpPort ${httpPort} --lambdaPort ${lambdaPort} ` +
      `--websocketPort ${websocketPort} ` +
      `--stage ${stage}`,
    port: httpPort,
    launchTimeout: 30000,
    debug: true
  })
}