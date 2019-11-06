import { combineReducers } from 'redux';
import product from './product';
import category from './category';
import user from './user';

const appReducer = combineReducers ({
    product, category, user
});

export default appReducer;