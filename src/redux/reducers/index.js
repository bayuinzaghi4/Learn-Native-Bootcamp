import { combineReducers } from '@reduxjs/toolkit';
import userSlice from './user';
import carsSlice from './cars';
import orderSlice from './order';

const rootReducer = combineReducers({
    user: userSlice,
    cars: carsSlice,
    order: orderSlice

})

export default rootReducer;
