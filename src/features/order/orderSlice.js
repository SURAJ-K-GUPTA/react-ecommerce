import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, fetchCount } from './orderAPI';

const initialState = {
  orders: [],
  status: 'idle',
  curentOrder:null
};
//we may need more info of current order;

export const createOrderAsync = createAsyncThunk(
  'counter/createOrder',
  async (amount) => {
    const response = await createOrder(amount);
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
      });
  },
});

export const { resetOrder } = orderSlice.actions;

export const selectCurrentOrder = (state) => state.order.curentOrder;


export default orderSlice.reducer;
