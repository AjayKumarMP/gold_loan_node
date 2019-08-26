import logger from '../../../../lib/logger';
import { response_200, response_400, setResponse } from '../../../../lib/apiResponseFormat';
import {
    addAddressService,
    deleteAddressService,
    getAddressService,
    updateAddressService,
} from '../../../services/address';

export async function addAddress(ctx, next) {
    try {
        const response = await addAddressService(ctx.request.body);
        setResponse(ctx.response, response_200(response));
    }
    catch (e) {
        setResponse(ctx.response, response_400(e.message));
        logger.error(e);
    }
    next();
}

export async function updateAddress(ctx, next) {
    try {
        const response = await updateAddressService(ctx.request.body);
        setResponse(ctx.response, response_200(response));
    }
    catch (e) {
        setResponse(ctx.response, response_400(e.message));
        logger.error(e);
    }
    next();
}

export async function deleteAddress(ctx, next) {
    try {
        const response = await deleteAddressService(ctx.request.body);
        setResponse(ctx.response, response_200(response));
    }
    catch (e) {
        setResponse(ctx.response, response_400(e.message));
        logger.error(e);
    }
    next();
}

export async function getAddress(ctx, next) {
    try {
        const response = await getAddressService(ctx.request.query);
        setResponse(ctx.response, response_200(response));
    }
    catch (e) {
        setResponse(ctx.response, response_400(e.message));
        logger.error(e);
    }
    next();
}
