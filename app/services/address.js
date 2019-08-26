import _ from 'lodash';
import { create, update, destroy, getDetails, get } from '../models/address';
import { getUserById } from '../models/users';
import { filterData } from '../../lib/utils';

export async function addAddressService(params) {
    const {
        clientId, location, addressLine1, addressLine2, city, pincode, state, country, nick, createdBy,
    } = params;
    const data = {
        clientId, location, addressLine1, addressLine2, city, pincode, state, country, nick, createdBy,
    };
    const user = getUserById(clientId);
    if (!user) { throw new Error(`User not found with driver Id : ${clientId}`); }
    const id = await create(data);
    _.set(data, 'id', id);
    return data;
}
export async function updateAddressService(params) {
    const {
        location, nick, id, lastUpdatedBy, clientId,
    } = params;
    const data = filterData({
        location, nick, lastUpdatedBy, clientId,
    });
    await update(id, data);
    return true;
}
export async function deleteAddressService(params) {
    const { id, lastUpdatedBy } = params;
    await destroy(id, lastUpdatedBy);
    return true;
}
export async function getAddressService(params) {
    const { type, id } = params;
    const allowed = ['clientId', 'id'];
    if (!_.includes(allowed, type)) { throw new Error('Invalid type'); }
    if (type === 'id') {
        const address = await get(id);
        return address;
    }
    const addresses = await getDetails(type, id);
    return addresses;
}
