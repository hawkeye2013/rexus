const express = require('express');
const ConnectionController = require('../controllers/ConnectionController');
const router = express.Router();
const connectionCtrl = new ConnectionController();

module.exports = async function() {
  await connectionCtrl.init();

  router.get('/', (req, res) => {
    res.send('Get Connections');
  });

  router.get('/:id', (req, res) => {
    res.send(`Get Connections By ID: ${req.params.id}`);
  });

  router.put('/', (req, res) => {
    res.send('Update Route');
  });

  router.post('/', async (req, res) => {
    await connectionCtrl.createConnection();
    res.send('Create Connection');
  });

  router.post('/test', async (req, res) => {
    const connection = req.body;

    try {
      const testResults = await connectionCtrl.testConnection(connection);
      res.json({
        connectionValid: testResults,
      });
    } catch (err) {
      res.json({
        connectionValid: false,
      });
    }
  });

  return router;
};
