import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const postLogin = createAsyncThunk(
    'user/postLogin',
    async (payload, { rejectWithValue }) => {
        try {
            const res = await axios.post('http://192.168.100.2:3000/api/v1/auth/signin',
                JSON.stringify(payload), {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            );
            const data = res.data;
            return data;
        } catch (e) {
            if(e.response.data){
                return rejectWithValue(e.response.data.message);
            }else{
                return rejectWithValue('Something went wrong');
            }
        }
    }
);

export const getProfile = createAsyncThunk(
    'user/getProfile',
    async (token, { rejectWithValue }) => {
        try {
            const res = await axios('http://192.168.100.2:3000/api/v1/auth/whoami', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const { data } = res.data;
            return data;
        } catch (e) {
            if(e.response.data){
                return rejectWithValue(e.response.data.message);
            }else{
                return rejectWithValue('Something went wrong');
            }
        }
    }
)