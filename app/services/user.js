import _ from 'lodash';
import { create, update, destroy, get, getUserByPno } from '../models/users';
import { getOrdersByRole } from '../models/order';
import { filterData } from '../../lib/utils';

export async function addUserService(params) {
    const {
        name, email, phone_number, role,
    } = params;
    const data = {
        name, email, phone_number, role,
    };
    const user = await getUserByPno(phone_number);
    if (user && (user.email === email || user.phone_number === phone_number)) {
        throw new Error(`User already exists with the phone number:${phone_number} or email: ${email}`);
    }
    const id = await create(data);
    _.set(data, 'id', id);
    return data;
}
export async function updateUserService(params) {
    const {
        name, email, phone_number, role, id,
    } = params;
    const data = filterData({
        name, email, phone_number, role, id,
    });
    await update(id, data);
    return true;
}
export async function deleteUserService(params) {
    const { id, lastUpdatedBy } = params;
    await destroy(id, lastUpdatedBy);
    return true;
}
export async function getUserService(params) {
    const { id } = params;
    const user = await get(id);
    return user;
}

export async function getUserDetails(params) {
    const { phone_number } = params;
    const data = await getOrdersByRole(phone_number);
    return data;
}
