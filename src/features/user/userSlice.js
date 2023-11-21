import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUserOrders } from './userAPI';

const initialState = {
  userOrders: [],
  status: 'idle',
};


export const fetchLoggedInUseOrdersAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async (id) => {
    const response = await fetchLoggedInUserOrders(id);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },

  },
    extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUseOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUseOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // this info can be different or more from logged-in User info
        state.userOrders = action.payload;
      });
  },
});

export const selectUserOrders = (state) => state.user.userOrders

export const { increment } = userSlice.actions;



export default userSlice.reducer;
