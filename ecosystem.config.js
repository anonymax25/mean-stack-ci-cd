module.exports = {
    apps: [
      {
        name: 'aws-codedeploy',
        script: 'docker-compose',
        args: 'up',
        interpreter: 'none',
        env: {
          NODE_ENV: 'development',
        },
      },
    ],
  }