import {configureStore, combineReducers} from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import accountSlice from "./slices/account.slice";
import authSlice from "./slices/auth/auth.slice";

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['account', 'user'],
};

const rootReducer = combineReducers({
     accaunt: accountSlice,
     auth: authSlice,
}); 
  
const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
          }
        }),
    devTools:true,
  });

  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatcher = typeof store.dispatch;
  export const persistor = persistStore(store);
