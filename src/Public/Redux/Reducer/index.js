import { combineReducers } from 'redux';
import product from './product';
import category from './category';
import user from './user';
import transaction from './transaction';

const appReducer = combineReducers ({
    product, category, user, transaction
});

export default appReducer;