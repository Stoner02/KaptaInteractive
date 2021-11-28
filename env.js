module.exports = {
    production: {
      certUrl: __dirname + '/ssl/production/',
      keyUrl: __dirname + '/ssl/production/',
      portHTTP: 80,
      portHTTPS: 443,
    },
    development: {
      certUrl: __dirname + '/ssl/development/localhost.crt',
      keyUrl: __dirname + '/ssl/development/localhost.key',
      portHTTP: 3000,
      portHTTPS: 3001,
    },
  };
  