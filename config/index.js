import path from 'path';

const env = process.env.NODE_ENV || 'development';
const configs = {
    base: {
        env,
        host : 'localhost',
        port : 5000,
    },
    production: {
        port   : process.env.APP_PORT || 7071,
        logger : {
            name    : 'finiciti-service',
            streams : [{
                type   : 'rotating-file',
                path   : path.join(__dirname, '../../.finiciti-service.log'),
                period : '1d',
                count  : 7,
                level  : 'info',
            }],
        },
    },
    development: {
        logger: {
            name    : 'finiciti-service-dev',
            streams : [{
                type   : 'stream',
                stream : process.stdout,
                level  : 'debug',
            }],
        },
    },
    test: {
        port   : 5001,
        logger : {
            name    : 'finiciti-service-test',
            streams : [],
        },
    },
};
const config = Object.assign(configs.base, configs[env]);

export default config;
