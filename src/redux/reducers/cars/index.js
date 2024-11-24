import { createSlice } from '@reduxjs/toolkit';
import { getCars, getCarDetails } from './apii';

const initialState = {
    data: null, 
    status: 'idle', 
    message: null,
}

export const carsSlice = createSlice({
    name: 'cars',
    initialState,
    reducers: { 
        resetState: (state) => initialState,
    },
    extraReducers: (builder) => {
        //Get Cars Reducer
        builder.addCase(getCars.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(getCars.fulfilled, (state, action) => {
            state.status = 'success';
            state.data = action.payload.data;
            state.message = action.payload;
        });
        builder.addCase(getCars.rejected, (state, action) => {
            state.status = 'failed';
            console.log(action);
            state.message = action.payload;
        });
        //Get Cars Details Reducer
        builder.addCase(getCarDetails.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(getCarDetails.fulfilled, (state, action) => {
            state.status = 'success';
            state.data = action.payload;
            state.message = action.payload;
        });
        builder.addCase(getCarDetails.rejected, (state, action) => {
            state.status = 'failed';
            console.log(action);
            state.message = action.payload;
        });

    }
});


export const selectCars = (state) => state.cars; // selector untuk mengambil state userff
export const { resetState } = carsSlice.actions; // action untuk logout
export { getCars, getCarDetails }; // action untuk panggil api postLogin dan get Profile
export default carsSlice.reducer // cars reducer untuk di tambahkan ke store

