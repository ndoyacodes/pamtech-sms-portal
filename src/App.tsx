import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import FloatingChatIcon from './components/floating-chat'
import router from './router'
function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <FloatingChatIcon/>
    </QueryClientProvider>
  )
}

export default App
