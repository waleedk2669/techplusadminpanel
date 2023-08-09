// third-party
import { combineReducers } from 'redux';

// project import
import auth from './auth'
import menu from './menu';
import products from './products';
import medicines from './medicines';
import comfortKits from './comfortKits';
import users from './users';
// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, products: products, medicines: medicines, comfortKits: comfortKits, auth: auth, users: users});

export default reducers;
