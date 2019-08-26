import _ from 'lodash';

export function filterData(data) {
    return _.omitBy(data, _.isUndefined || _.isEmpty);
}
