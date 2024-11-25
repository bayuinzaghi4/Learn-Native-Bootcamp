import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postOrder = createAsyncThunk(
    'order/postOrder',
    async ({ form, token }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://172.17.32.188:3000/api/v1/order',
                form,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
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
);

export const updateOrder = createAsyncThunk(
    'order/updateOrder',
    async ({ id, form, token }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `http://172.17.32.188:3000/api/v1/order/${id}`, form,
                {
                    headers: {
                        Content: 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            const data = response.data
            return data
        } catch (error) {
            if (error.response.data) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue('Somethink when wrong');
            }
        }
    }
);

export const getMyOrder = createAsyncThunk(
    'order/getMyOrder',
    async (token, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://172.17.32.188:3000/api/v1/order/myorder',
                {
                    headers: {
                        Content: 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            const data = response.data;
            return data;
        } catch (error) {
            if (error.response.data) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue('Somethink when wrong');
            }
        }
    }
)