import logger from '../../../../lib/logger';
import { response_200, response_400, setResponse } from '../../../../lib/apiResponseFormat';
import {
    addUserService,
    deleteUserService,
    getUserService,
    updateUserService,
    getUserDetails,
} from '../../../services/user';

export async function addUser(ctx, next) {
    try {
        const response = await addUserService(ctx.request.body);
        setResponse(ctx.response, response_200(response));
    }
    catch (e) {
        setResponse(ctx.response, response_400(e.message));
        logger.error(e);
    }
    next();
}

export async function updateUser(ctx, next) {
    try {
        const response = await updateUserService(ctx.request.body);
        setResponse(ctx.response, response_200(response));
    }
    catch (e) {
        setResponse(ctx.response, response_400(e.message));
        logger.error(e);
    }
    next();
}

export async function deleteUser(ctx, next) {
    try {
        const response = await deleteUserService(ctx.request.body);
        setResponse(ctx.response, response_200(response));
    }
    catch (e) {
        setResponse(ctx.response, response_400(e.message));
        logger.error(e);
    }
    next();
}

export async function getUser(ctx, next) {
    try {
        const response = await getUserService(ctx.request.query);
        setResponse(ctx.response, response_200(response));
    }
    catch (e) {
        setResponse(ctx.response, response_400(e.message));
        logger.error(e);
    }
    next();
}

export async function getUserDetail(ctx, next) {
    try {
        const response = await getUserDetails(ctx.request.query);
        console.log(response);
        setResponse(ctx.response, response_200(response));
    }
    catch (e) {
        setResponse(ctx.response, response_400(e.message));
        logger.error(e);
    }
    next();
}
