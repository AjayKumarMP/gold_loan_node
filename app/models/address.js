import _ from 'lodash';
import * as DataStore from '../../lib/dataStoreCRUD';
import { NAMESPACE, ADDRESS_KIND } from '../../lib/constants';
import dataStoreClient from '../../lib/dataStore';

export async function create(data) {
    const finalData = {
        createdOn     : Date.now(),
        lastUpdatedOn : null,
        lastUpdatedBy : null,
        nick          : null,
        isDeleted     : false,
    };
    _.merge(finalData, data);
    const address = await DataStore.create(ADDRESS_KIND, finalData, null, NAMESPACE);
    return address;
}

export async function update(key, data) {
    if (_.isUndefined(key)) { throw new Error('Invalid address Id'); }
    const address = await get(key);
    if (!address) { throw new Error('Address not found'); }
    const finaldata = {
        lastUpdatedOn : Date.now(),
        lastUpdatedBy : 'system',
    };
    _.merge(finaldata, data);
    _.merge(address, finaldata);
    await DataStore.update(address);
    return address;
}
export async function get(id) {
    const filters = DataStore.constructQueryFilter('__key__', '=', dataStoreClient.key({ namespace: NAMESPACE, path: [ADDRESS_KIND, parseInt(id)] }));
    filters.push(DataStore.appendQueryFilters('isDeleted', '=', false));
    const [address] = await DataStore.get(ADDRESS_KIND, filters, 1, NAMESPACE);
    return address;
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
    const addresses = await DataStore.get(ADDRESS_KIND, filters, null, NAMESPACE);
    _.forEach(addresses, address => {
        const key = parseInt(address[dataStoreClient.KEY].id);
        _.set(address, 'id', key);
    });
    return addresses;
}
