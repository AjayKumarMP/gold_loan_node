import logger from '../../../../lib/logger';
import { response_200, response_400, setResponse } from '../../../../lib/apiResponseFormat';
import { addOrderService, updateOrderService } from '../../../services/order';

export async function addOrder(ctx, next) {
    try {
        const response = await addOrderService(ctx.request.body);
        setResponse(ctx.response, response_200(response));
    }
    catch (e) {
        setResponse(ctx.response, response_400(e.message));
        logger.error(e);
    }
    next();
}

export async function updateOrder(ctx, next) {
    try {
        const response = await updateOrderService(ctx.request.body);
        setResponse(ctx.response, response_200(response));
    }
    catch (e) {
        setResponse(ctx.response, response_400(e.message));
        logger.error(e);
    }
    next();
}
