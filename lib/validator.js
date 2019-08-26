export const emptyQueryParams = params => Object.entries(params).every(param => typeof param[1] === 'undefined');
