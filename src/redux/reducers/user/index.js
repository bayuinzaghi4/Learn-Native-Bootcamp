import { createSlice } from '@reduxjs/toolkit';
import { postLogin, getProfile, postRegister, googleLogin } from './api';

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
    reducers: { // kumpulan method untuk mengubah initial state secara synchronous
        logout: (state) => initialState,
        resetState: (state) => initialState,
        changeUserStatus: (state) => {
            state.status = 'idle'
        },
        setStateByName: (state, action) => {
            state[action.payload.name] = action.payload.value;
        }

    },
    extraReducers: (builder) => {
        //Post Login Reducer
        builder.addCase(postLogin.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(postLogin.fulfilled, (state, action) => {// action = { type: '', payload: data, meta: {}}
            state.status = 'success';
            state.data = action.payload.data.user;
            state.token = action.payload.data.token;
            state.message = action.payload.message;
            state.isLogin = true;
        });
        builder.addCase(postLogin.rejected, (state, action) => {
            state.status = 'failed';
            console.log(action);
            state.message = action.payload;
        });
        //Post Register Reducer
        builder.addCase(postRegister.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(postRegister.fulfilled, (state, action) => {// action = { type: '', payload: data, meta: {}}
            state.status = 'success';
            state.data = action.payload.data.user;
            state.message = action.payload.message;
        });
        builder.addCase(postRegister.rejected, (state, action) => {
            state.status = 'failed';
            console.log(action);
            state.message = action.payload;
        });

        //Get Profile Reducers
        builder.addCase(getProfile.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.status = 'success';
            state.data = action.payload.data.user;
            state.message = action.payload.message;
        });
        builder.addCase(getProfile.rejected, (state, action) => {
            state.status = 'failed';
            console.log(action);
            state.message = action.payload;
        });
        // google login
        builder.addCase(googleLogin.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(googleLogin.fulfilled, (state, action) => {// action = { type: '', payload: data, meta: {}}
            state.status = 'success';
            state.data = action.payload.data.user;
            state.token = action.payload.data.token;
            state.message = action.payload.message;
            state.isLogin = true;
        });
        builder.addCase(googleLogin.rejected, (state, action) => {
            state.status = 'failed';
            console.log(action);
            state.message = action.payload;
        });
    }
});

export const selectUser = (state) => state.user; // selector untuk mengambil state user
export const { logout, resetState, changeUserStatus, setStateByName } = userSlice.actions; // action untuk logout
export { postLogin, getProfile, postRegister, googleLogin }; // action untuk panggil api postLogin dan get Profile
export default userSlice.reducer; // user reducer untuk di tambahkan ke store
