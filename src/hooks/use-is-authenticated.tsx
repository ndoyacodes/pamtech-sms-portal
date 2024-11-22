import { useEffect } from 'react'
import useLocalStorage from './use-local-storage'

export default function useIsAuthenticated() {
  const [isAuthenteticated, setIsAuthenticated] = useLocalStorage({
    key: 'token',
    defaultValue: "",
  })

  useEffect(() => {
    const handleAuthenticated = () => {
      // Update isCollapsed based on window.innerWidth
      setIsAuthenticated("Test")
    }

    // Initial setup
    handleAuthenticated()

    // Add event listener for window resize
    // window.addEventListener('resize', handleResize)

    // Cleanup event listener on component unmount
    return () => {
    //   window.removeEventListener('resize', handleResize)
        //clearn;
        isAuthenteticated
    }
  }, [isAuthenteticated, setIsAuthenticated])

  return [isAuthenteticated, setIsAuthenticated] as const
}
