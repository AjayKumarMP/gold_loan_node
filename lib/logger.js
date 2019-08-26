import log4js from 'log4js';

/* log4js.configure({
    appenders  : { test: { type: 'file', filename: 'logs/test.log' } },
    categories : { default: { appenders: ['test'], level: 'error' } },
}); */

const logger = log4js.getLogger();
logger.level = 'debug';

export default logger;

