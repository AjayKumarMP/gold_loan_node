import Router from 'koa-router';
import {
    addUser,
    updateUser,
    deleteUser,
    getUser,
    getUserDetail,
} from './app/controllers/api/v1/user';
import { addOrder, updateOrder } from './app/controllers/api/v1/order';


const router = new Router();
/**
 * @method POST
 * @param(*) name: string
 * @param(*) phone_number: string - unique
 * @param(*) email: string - unique
 */
router.post('/user/createUser', addUser);
/**
 * @method POST
 * @param(*) name: string
 * @param(*) phone_number: string - unique
 * @param(*) email: string - unique
 */
router.post('/user/updateUser', updateUser);
router.delete('/user/deleteUser', deleteUser);
router.get('/user/getUser', getUser);
/**
 * @method GET
 * @param(*) name: integer
 */
router.get('/user/getUserDetails', getUserDetail);
/**
 * @method POST
 * @param(*) category
 * @param(*) user_pno
 * @param(*) category
 * @returns { user, ssoList, orders}
 */
router.post('/order/createOrder', addOrder);
/**
 * @method POST
 * @param category
 * @param user_pno
 * @param category
 * @param status
 * @param user_pno
 * @param estimation
 * @param description
 * @param gold_weight
 * @param id - orderId
 * @param wastage
 * @param assigned_to
 */
router.post('/order/updateOrder', updateOrder);

export default router;
