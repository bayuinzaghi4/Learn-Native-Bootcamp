// redux/reducers/countdown.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  countdowns: {},
};

const countdownSlice = createSlice({
  name: 'countdown',
  initialState,
  reducers: {
    setCountdown: (state, action) => {
      const { orderId, countdown } = action.payload;
      state.countdowns[orderId] = countdown;
    },
    resetCountdown: (state, action) => {
      const { orderId } = action.payload;
      delete state.countdowns[orderId];
    },
  },
});

export const { setCountdown, resetCountdown } = countdownSlice.actions;

export const selectCountdown = (state, orderId) => state.countdown.countdowns[orderId];

export default countdownSlice.reducer;
