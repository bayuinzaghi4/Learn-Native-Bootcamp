import { combineReducers } from '@reduxjs/toolkit';
import userSlice from './user';
import carsSlice from './cars';
import orderSlice from './order';
import countdownReducer from './timer';

const rootReducer = combineReducers({
    user: userSlice,
    cars: carsSlice,
    order: orderSlice,
    countdowns: countdownReducer, 
})

export default rootReducer;
