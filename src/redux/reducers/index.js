import { combineReducers } from '@reduxjs/toolkit';
import userSlice from './user';
import carsSlice from './cars';

const rootReducer = combineReducers({
    user: userSlice,
    cars: carsSlice

})

export default rootReducer;
