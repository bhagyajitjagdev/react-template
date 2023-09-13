import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StorageKeys } from '../../types/shared';
import { IUser } from '../../types/user';

interface IUserState {
  user: IUser | null;
  token: string | null;
  profileErrors: string | null;
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: null,
    profileErrors: null,
  } as IUserState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      localStorage.set(StorageKeys.token, action.payload);
      state.token = action.payload;
    },
    setProfileErrors: (state, action: PayloadAction<string | null>) => {
      state.profileErrors = action.payload;
    },
  },
});

export const { setUser, setToken, setProfileErrors } = userSlice.actions;
export default userSlice.reducer;
