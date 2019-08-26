import NAMESPACES from '../config/namespace';

export const STATUS_OK = 200;
export const STATUS_ERROR = 500;
export const NAMESPACE = NAMESPACES[process.env.NODE_ENV ? process.env.NODE_ENV : 'dev'];
export const USERS_KIND = 'users';
export const ORDERS_KIND = 'orders';