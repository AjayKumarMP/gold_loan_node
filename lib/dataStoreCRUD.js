import _ from 'lodash';
import dataStoreClient from './dataStore';
import logger from './logger';

export async function get(kind, filters, limitValue, namespace) {
    const query = dataStoreClient.createQuery(namespace, kind);
    const finalQuery = filters.reduce((newQuery, filter) => newQuery.filter(filter.type, filter.op, filter.value), query); // eslint-disable-line

    const [results] = await dataStoreClient.runQuery(limitValue ? finalQuery.limit(limitValue) : finalQuery); //eslint-disable-line
    return results;
}

export async function create(kind, data, key, namespace) {
    let mKey = '';
    const path = [kind];
    if (key) {
        path.push(key);
    }
    if (namespace) {
        mKey = dataStoreClient.key({
            namespace,
            path,
        });
    }
    else {
        mKey = dataStoreClient.key({
            path,
        });
    }
    const entity = {
        key: mKey,
        data,
    };
    try {
        const _result = await dataStoreClient.upsert(entity);
        return mKey.id;
    }
    catch (err) {
        logger.error('An error occurred while creating the entity', err);
        throw err;
    }
}

export const update = async entity => {
    try {
        const [results] = await dataStoreClient.upsert(entity);
        return results;
    }
    catch (err) {
        logger.error(`An error occurred while updating - ${err}`);
        throw err;
    }
};

export const constructQueryFilter = (type, op, value) => [{ type, op, value }];
export const appendQueryFilters = (type, op, value) => ({ type, op, value });
