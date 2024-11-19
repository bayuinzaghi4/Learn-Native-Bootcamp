import { createSlice } from "@reduxjs/toolkit";
import { postOrder } from "./api";

const initialState = {
    data: null, 
    status: 'idle', 
    message: null,
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        orderReset: (state) => initialState 
    },
    extraReducers: (builder) => {
        // Post Order
        builder.addCase(postOrder.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(postOrder.fulfilled, (state, action) => {
            state.status = 'success';
            state.data = action.payload.data;
            state.message = action.payload.message;
        });
        builder.addCase(postOrder.rejected, (state, action) => {
            state.status = 'failed';
            state.message = action.payload;
        });
    }
})