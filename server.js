import cors from 'koa-cors';
import koaBody from 'koa-body';
// import server from 'koa-static-server';

import router from './router';

async function incoming_request(ctx, next) {
    console.log('URL is', ctx);
    next();
}


const applyMiddleware = app => {
    app.use(cors());
    app.use(koaBody());
    // app.use(incoming_request);
    app.use(router.routes());
};

export default applyMiddleware;

