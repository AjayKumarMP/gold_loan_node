import * as _ from 'lodash';
import * as DataStore from '../../lib/dataStoreCRUD';
import { NAMESPACE, ORDERS_KIND } from '../../lib/constants';
import dataStoreClient from '../../lib/dataStore';
import { getUserByPno, getAllSsoList } from '../models/users';

const radix = 10;

export async function create(data) {
    const finalData = {
        createdOn       : Date.now(),
        lastUpdatedOn   : null,
        lastUpdatedBy   : null,
        status          : 'unAssigned',
        weight          : null,
        description     : null,
        isDeleted       : false,
        user_pno        : null,
        assigned_to     : null,
        category        : null,
        estimation      : null,
    };

    _.merge(finalData, data);
    console.log(ORDERS_KIND, finalData, null, NAMESPACE);
    const order = await DataStore.create(ORDERS_KIND, finalData, null, NAMESPACE);
    return order;
}

export async function get(id) {
    const filters = DataStore.constructQueryFilter('__key__', '=', dataStoreClient.key({ namespace: NAMESPACE, path: [ORDERS_KIND, parseInt(id, radix)] }));
    filters.push(DataStore.appendQueryFilters('isDeleted', '=', false));
    const [orders] = await DataStore.get(ORDERS_KIND, filters, 1, NAMESPACE);
    return orders;
}

export async function getOrdersByRole(pno) {
    const user = await getUserByPno(pno);
    console.log('Inside getdet', user);
    if (!user) {
        throw new Error('No User exists');
    }
    let orders = null;
    let ssoList = null;
    switch (user.role) {
    case 'SSO':
        orders = await getAssignedOrders(pno);
        break;
    case 'ADMIN':
        orders = await getUnAssignedOrders();
        ssoList = await getAllSsoList();
        break;
    default:
        orders = await getOrderByuser(pno, 1);
        break;
    }
    return { user, orders, ssoList };
}

export async function getUnAssignedOrders() {
    const filters = DataStore.constructQueryFilter('isDeleted', '=', false);
    const orders = await DataStore.get(ORDERS_KIND, filters, 100, NAMESPACE);
    return orders;
}

export async function getAssignedOrders(pno) {
    const filters = DataStore.constructQueryFilter('assigned_to', '=', parseInt(pno, radix));
    filters.push(DataStore.appendQueryFilters('isDeleted', '=', false));
    filters.push(DataStore.appendQueryFilters('status', '=', 'assigned'));
    const orders = await DataStore.get(ORDERS_KIND, filters, 100, NAMESPACE);
    return orders;
}


export async function getOrderByuser(pno, limit) {
    const filters = DataStore.constructQueryFilter('user_pno', '=', parseInt(pno, radix));
    filters.push(DataStore.appendQueryFilters('isDeleted', '=', false));
    const orders = await DataStore.get(ORDERS_KIND, filters, limit, NAMESPACE);
    return orders;
}

export async function updateOrder(key, data) {
    if (_.isUndefined(key)) { throw new Error('Invalid Order Id'); }
    const order = await get(key);
    if (!order) { throw new Error('order not found'); }
    const finaldata = {
        lastUpdatedOn : Date.now(),
        lastUpdatedBy : 'system',
    };
    _.merge(finaldata, data);
    _.merge(order, finaldata);
    await DataStore.update(order);
    return order;
}
