import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../types/auth-state';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    tokens: {
      access: null,
      refresh: null
    },
    isAuthenticated: false
  } as AuthState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ access_token: string; refresh_token: string }>
    ) => {
      const { access_token, refresh_token } = action.payload;
      console.log("-------------------------------------------------------");
      console.log('access_token', access_token);
      

      // Decode user info
    //   const userInfo = decodeAndExtractUserInfo(access_token);

      state.tokens.access = access_token;
      state.tokens.refresh = refresh_token;
    //   state.user = userInfo;
    //   state.isAuthenticated = !!userInfo;
    },
    setLogoutAction: state => {
      state.user = null;
      state.tokens = { access: null, refresh: null };
      state.isAuthenticated = false;
    }
  }
});

export const { setCredentials, setLogoutAction } = authSlice.actions;
export default authSlice.reducer;
