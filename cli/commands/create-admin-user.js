const inquirer = require('inquirer');
const { getCoreStackConfig } = require('../lib/get-config');
const { execFileSync } = require('child_process');

const createAdminUser = (({blogName, region}, callback) => {

  const questions = [
    {
      name: "email",
      message: "Admin user email address"
    },
    {
      type: "password",
      name: "password",
      message: "Please choose a password"
    },
    {
      type: "password",
      name: "password_confirm",
      message: "Please confirm the password"
    }
  ];
  inquirer.prompt(questions).then(answers => {

    getCoreStackConfig({blogName, region}, (err, data) => {

      const userPoolId = data.SeeBlogAdminUserPoolId;
      const clientId = data.SeeBlogAdminAppClientId;

      const createArgs = [
        'cognito-idp',
        'sign-up',
        '--region', region,
        '--client-id', clientId,
        '--username', answers.email,
        '--password', answers.password
      ];

      console.log(execFileSync('aws', createArgs).toString());

      const confirmArgs = [
        'cognito-idp',
        'admin-confirm-sign-up',
        '--region', region,
        '--user-pool-id', userPoolId,
        '--username', answers.email,
      ];

      console.log(execFileSync('aws', confirmArgs).toString());

      callback(null)
    });

  });

})

module.exports = createAdminUser;
