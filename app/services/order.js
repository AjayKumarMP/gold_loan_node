import _ from 'lodash';
import { getOrdersByRole, create, updateOrder, destroy, get } from '../models/order';
import { filterData } from '../../lib/utils';

export async function addOrderService(params) {
    const {
        category, user_pno, estimation, description,
    } = params;
    if (!category || !user_pno || !estimation) {
        throw new Error('Missing Mandatory fields: category, user_pno, estimation');
    }
    const data = {
        description, category, user_pno, estimation,
    };
    const id = await create(data);
    _.set(data, 'id', id);
    return data;
}
export async function updateOrderService(params) {
    const {
        category, status, user_pno, estimation, description, id, gold_weight, wastage, assigned_to,
    } = params;
    const data = filterData({
        category, status, user_pno, estimation, description, gold_weight, wastage, assigned_to,
    });
    await updateOrder(id, data);
    return true;
}
export async function deleteOrderService(params) {
    const { id, lastUpdatedBy } = params;
    await destroy(id, lastUpdatedBy);
    return true;
}
export async function getOrderService(params) {
    const { id } = params;
    const order = await get(id);
    return order;
}

export async function getOrderDetails(params) {
    const { phone_number } = params;
    const data = await getOrdersByRole(phone_number);
    return data;
}
