import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postOrder = createAsyncThunk(
    'order/postOrder',
    async ({ form, token }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://192.168.1.31:3000/api/v1/order',
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
                `http://192.168.1.31:3000/api/v1/order/${id}`, form,
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
            const response = await axios.get('http://192.168.1.31:3000/api/v1/order/myorder',
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
);

export const payment = createAsyncThunk(
    'order/payment',
    async ({id,receipt, token}, {rejectWithValue}) => {
      try {
        const response = await axios.put(
          `http://192.168.1.31:3000/api/v1/order/${id}/payment`,
          receipt,
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
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue('Somethink when wrong');
        }
      }
    },
);

export const getOrderDetail = createAsyncThunk(
    'order/getOrderDetail',
    async ({id, token}, {rejectWithValue}) => {
      try {
        const response = await axios.get(
          `http://192.168.1.31:3000/api/v1/order/${id}`,
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
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue('Somethink when wrong');
        }
      }
    },
);