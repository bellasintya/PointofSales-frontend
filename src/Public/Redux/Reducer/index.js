import { combineReducers } from 'redux';
import product from './product';
import category from './category';
import user from './user';
import transaction from './transaction';
import notification from './notification';

const appReducer = combineReducers ({
    product, category, user, transaction, notification
});

export default appReducer;