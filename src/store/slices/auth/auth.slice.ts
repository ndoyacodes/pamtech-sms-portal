import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, UserInfo } from '../../types/auth-state';

const initialState: AuthState = {
  user: null,
  tokens: {
    access: null,
    refresh: null
  },
  isAuthenticated: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        user: UserInfo;
      }>
    ) => {
      const { accessToken, refreshToken, user } = action.payload;
      console.log('user', user);
      console.log('accessToken', accessToken);
      console.log('refreshToken', refreshToken);

      state.tokens.access = accessToken;
      state.tokens.refresh = refreshToken;
      state.user = user;
      state.isAuthenticated = !!user;

      // Optional: store tokens in localStorage
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
    },

    logout: (state) => {
      state.user = null;
      state.tokens = { access: null, refresh: null };
      state.isAuthenticated = false;

      // Optional: remove from localStorage if used
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
