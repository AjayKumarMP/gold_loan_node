import Koa from 'koa';
import config from './config';
import applyMiddleware from './server';

const app = new Koa();

// Start server
if (!module.parent) {
    app.listen(config.port, config.ip, () => {
        console.log(`Hedwig service API server listening on ${config.host}:${config.port}, in ${config.env}`);
    });
}

// apply middlewares
applyMiddleware(app);

export default app;

