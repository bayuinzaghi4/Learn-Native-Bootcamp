import { createSlice } from "@reduxjs/toolkit";
import { postOrder, updateOrder } from "./api";

const initialState = {
    data: null,
    status: 'idle',
    message: null,
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        orderReset: (state) => initialState,
        statusChange: (state) => {
            state.status = 'idle'
        }
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

        // Update Order
        builder.addCase(updateOrder.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(updateOrder.fulfilled, (state, action) => {
            state.status = 'success';
            state.data = action.payload.data;
            state.message = action.payload.message;
        });
        builder.addCase(updateOrder.rejected, (state, action) => {
            state.status = 'failed';
            state.message = action.payload;
        });
    }
});

export const selectOrder = (state) => state.order;
export const { orderReset, statusChange } = orderSlice.actions;
export { postOrder, updateOrder };
export default orderSlice.reducer;