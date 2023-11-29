import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, fetchAllOrders } from './orderAPI';

const initialState = {
  orders: [],
  status: 'idle',
  curentOrder:null,
  totalOrders:0
};
//we may need more info of current order;

export const createOrderAsync = createAsyncThunk(
  'counter/createOrder',
  async (amount) => {
    const response = await createOrder(amount);
    return response.data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  'counter/fetchAllOrders',
  async (pagination) => {
    const response = await fetchAllOrders(pagination);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    resetOrder: (state) =>{
      state.curentOrder = null;
    }

  },
    extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.curentOrder = action.payload
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders
      });
  },
});

export const { resetOrder } = orderSlice.actions;

export const selectCurrentOrder = (state) => state.order.curentOrder;
export const selectOrders = (state) => state.order.orders;
export const selectTotalOrders = (state) => state.order.totalOrders;


export default orderSlice.reducer;
