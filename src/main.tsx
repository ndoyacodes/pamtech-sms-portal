import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@/components/theme-provider'
import { Provider } from 'react-redux'
import { persistor, store } from './store/Store'
import { PersistGate } from 'redux-persist/integration/react'
import '@/index.css'
import App from './App'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
          <App/>
          <ToastContainer />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
