import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    account: boolean;
}
const accountSlice = createSlice({
  name: 'auth',
  initialState: {
    account: false,
  } as AuthState,
  reducers: {
    setAccount: (
      state,
      action: PayloadAction<{ account: boolean; }>
    ) => {
      const { account } = action.payload;
      state.account = account;
    },
  }
});

export const { setAccount } = accountSlice.actions;
export default accountSlice.reducer;
