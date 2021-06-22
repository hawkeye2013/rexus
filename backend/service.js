const express = require('express');
const path = require('path');
const rateLimit = require('express-rate-limit');
const { startLogger } = require('./startup/startup');

const spaLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 500, // start blocking after 500 requests
  message: 'Too many requests from this IP',
});

async function startService() {
  let app = express();

  app = startLogger(app);

  const appRouterV1 = await require('./v1/router')();

  app.use('/api/v1', appRouterV1);

  app.use('/status', (req, res) => {
    res.json({
      status: 'green',
    });
  });
  const staticPath = path.join('/', 'app', 'static');

  app.use(express.static(staticPath));

  app.use('/', spaLimiter, (req, res) => {
    res.sendFile('index.html');
  });

  return app;
}

module.exports = {
  startService,
};
