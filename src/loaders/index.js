const ExpressServer = require('./server/expressServer');
const config = require('../config');
const logger = require('./logger')

module.exports = async () => {


    const server = new ExpressServer();
    logger.info('Express Loaded');

    server.start();
    logger.info(`########################################
      Server Listening on port: ${config.port}
      ########################################
    `);

}