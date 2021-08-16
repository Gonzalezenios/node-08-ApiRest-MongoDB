const ExpressServer = require('./server/expressServer');
const mongooseLoader = require('./mongoose');
const config = require('../config');
const logger = require('./logger');

module.exports = async () => {

  await mongooseLoader();
  logger.info('DB loaded and connected');


  const server = new ExpressServer();
  logger.info('Express Loaded');

  server.start();
  logger.info(`########################################
      Server Listening on port: ${config.port}
      ########################################
    `);

};