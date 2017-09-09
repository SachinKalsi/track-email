'use strict';
const logger = require('winston');

logger.addColors({
    silly: 'magenta',
    debug: 'blue',
    verbose: 'cyan',
    info: 'green',
    warn: 'yellow',
    error: 'red'
});
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    level: process.env.LOGGER_LEVEL,//{ error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
    colorize: true,
});
module.exports = logger;
