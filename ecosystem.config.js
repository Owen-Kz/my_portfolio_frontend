module.exports = {
  apps: [
    {
      name: 'bn-portfolio',
      script: 'app.js',
      watch: false,
      autorestart: true,
      restart_delay: 5000,
      max_restarts: 10,
      error_file: './logs/err.log',
      out_file: './logs/out.log',
    },
  ],
};
