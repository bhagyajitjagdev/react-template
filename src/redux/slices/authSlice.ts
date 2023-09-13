import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAuthState {
  role: string | null;
  phoneNumber: string | null;
  name: string | null;
  email: string | null;
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    role: null,
    phoneNumber: null,
    name: null,
    email: null,
  } as IAuthState,
  reducers: {
    setAuthState: (state, action: PayloadAction<Partial<IAuthState>>) => {
      if (Object.prototype.hasOwnProperty.call(action.payload, 'role')) {
        state.role = action.payload?.role || null;
      }
      if (Object.prototype.hasOwnProperty.call(action.payload, 'phoneNumber')) {
        state.phoneNumber = action.payload?.phoneNumber || null;
      }
      if (Object.prototype.hasOwnProperty.call(action.payload, 'name')) {
        state.name = action.payload?.name || null;
      }
      if (Object.prototype.hasOwnProperty.call(action.payload, 'email')) {
        state.email = action.payload?.email || null;
      }
    },
  },
});

export const { setAuthState } = authSlice.actions;
export default authSlice.reducer;
