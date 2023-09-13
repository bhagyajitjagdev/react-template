import { createSlice } from '@reduxjs/toolkit';

export const loaderSlice = createSlice({
  name: 'loader',
  initialState: 0 as number,
  reducers: {
    setLoading: (state) => {
      return (state += 1);
    },
    removeLoading: (state) => {
      return (state -= 1);
    },
  },
});

export const { setLoading, removeLoading } = loaderSlice.actions;

export default loaderSlice.reducer;
