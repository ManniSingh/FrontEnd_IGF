import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/userTypes';

const initialState: {user: User | null} = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User|null>) {
      state.user = action.payload;
    }
  },
});

const userReducer = userSlice.reducer
export const { setUser } = userSlice.actions;
export default userReducer;
