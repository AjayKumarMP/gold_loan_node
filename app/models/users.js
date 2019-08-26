import * as _ from 'lodash';
import * as DataStore from '../../lib/dataStoreCRUD';
import { NAMESPACE, USERS_KIND } from '../../lib/constants';
import dataStoreClient from '../../lib/dataStore';

const radix = 10;

export async function create(data) {
    const finalData = {
        createdOn     : Date.now(),
        lastUpdatedOn : null,
        lastUpdatedBy : null,
        name          : null,
        phone_number  : null,
        email         : null,
        isDeleted     : false,
        role          : 'USER',
    };

    _.merge(finalData, data);
    const user = await DataStore.create(USERS_KIND, finalData, null, NAMESPACE);
    return user;
}

export async function get(id) {
    const filters = DataStore.constructQueryFilter('__key__', '=', dataStoreClient.key({ namespace: NAMESPACE, path: [USERS_KIND, parseInt(id, radix)] }));
    filters.push(DataStore.appendQueryFilters('isDeleted', '=', false));
    const [users] = await DataStore.get(USERS_KIND, filters, 1, NAMESPACE);
    return users;
}

export async function getUserByPno(phone_number) {
    console.log('Before folters');
    const filters = DataStore.constructQueryFilter('phone_number', '=', parseInt(phone_number, radix));
    filters.push(DataStore.appendQueryFilters('isDeleted', '=', false));
    console.log(filters);
    const [users] = await DataStore.get(USERS_KIND, filters, 1, NAMESPACE);
    return users;
}

export async function update(key, data) {
    if (_.isUndefined(key)) { throw new Error('Invalid user Id'); }
    const users = await get(key);
    if (!users) { throw new Error('user not found'); }
    const finaldata = {
        lastUpdatedOn : Date.now(),
        lastUpdatedBy : 'system',
    };
    _.merge(finaldata, data);
    _.merge(users, finaldata);
    await DataStore.update(users);
    return users;
}

export async function destroy(id, updatedBy = null) {
    let lastUpdatedBy;
    if (_.isUndefined(updatedBy) || _.isNull(updatedBy)) { lastUpdatedBy = 'system'; }
    else lastUpdatedBy = updatedBy;
    await update(id, { isDeleted: true, lastUpdatedBy });
    return true;
}
export async function getDetails(type, id) {
    const filters = DataStore.constructQueryFilter(type, '=', id);
    filters.push(DataStore.appendQueryFilters('isDeleted', '=', false));
    const users = await DataStore.get(USERS_KIND, filters, null, NAMESPACE);
    _.forEach(users, user => {
        const key = parseInt(user[dataStoreClient.KEY].id, radix);
        _.set(user, 'id', key);
    });
    return users;
}

export async function getAllSsoList() {
    const filters = DataStore.constructQueryFilter('role', '=', 'SSO');
    filters.push(DataStore.appendQueryFilters('isDeleted', '=', false));
    const users = await DataStore.get(USERS_KIND, filters, 100, NAMESPACE);
    return users;
}
