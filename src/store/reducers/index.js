// third-party
import { combineReducers } from 'redux';

// project import
import auth from './auth'
import menu from './menu';
import products from './products';
import medicines from './medicines';
import comfortKits from './comfortKits';
import users from './users';
import newOrders from './newOrders';
// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, products: products, medicines: medicines, comfortKits: comfortKits, auth: auth, users: users, newOrders: newOrders});

export default reducers;
