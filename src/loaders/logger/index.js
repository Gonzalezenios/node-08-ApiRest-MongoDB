const winston = require('winston');
const config = require('../../config/index.js');

const transports = [];
transports.push(
    new winston.transports.Console(),
);

const loggerInstance = winston.createLogger({
    level: config.log.leve,
    format: winston.format.simple(),
    transports
});

module.exports = loggerInstance;