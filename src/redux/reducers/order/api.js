import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postOrder = createAsyncThunk(
    'user/postLogin',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://192.168.1.31:3000/api/v1/order',
                JSON.stringify(payload), {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            );
            const data = response.data;
            return data;
        } catch (error) {
            if (error.response.data) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue('Something went wrong');
            }
        }
    }
)