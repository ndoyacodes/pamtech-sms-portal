import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'
import router from '@/router'
import { Provider } from 'react-redux';
import { persistor, store } from './store/Store';
import { PersistGate } from 'redux-persist/integration/react';
import '@/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
    </PersistGate>
    </Provider>
  </React.StrictMode>
)
