import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCars = createAsyncThunk(
    'cars/getCars',
    async (token, { rejectWithValue }) => {
        try {
            const res = await axios.get('http://192.168.1.31:3000/api/v1/cars',
       {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
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


