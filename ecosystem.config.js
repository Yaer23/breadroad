module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'breadRoad',
      script    : './service/index.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    },

    // Second application
    {
      name      : 'WEB',
      script    : 'web.js'
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'Lydia',
      host : '132.232.124.245',
      ref  : 'origin/master',
      repo : 'git@github.com:Yaer23/breadroad.git',
      path : '/www/breadRoad',
      "ssh_options": "StrictHostKeyChecking=no",
      'post-deploy' : 'git pull && npm run build && pm2 reload ecosystem.config.js --env production'
    }
  }
};
