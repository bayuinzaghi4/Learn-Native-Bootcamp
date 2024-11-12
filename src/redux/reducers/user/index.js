import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: null, // variable untuk menyimpan data user
    token: null,
    isLogin: false,
    status: 'idle', // 'idle' | 'loading' | 'success' | 'failed'
    message: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state, action) => {
            state.data = null;
            state.isLogin = false;
            state.token = null;
        },
    }, // kumpulan method untuk mengubah initial state secara synchronous
    extraReducers: { // kumpulan method untuk mengubah initial state secara asynchronous

    },
});

export default userSlice.reducer;
