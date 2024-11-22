import { useEffect } from 'react';
import useLocalStorage from './use-localstorage'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';

function useToken(key: string, initialValue: string | null) {
  const [token, setToken] = useLocalStorage<string | null>(key, initialValue);
  const navigate=useNavigate();
  useEffect(() => {
    if (!token) {
      // Perform logout operation
      console.log('Token is missing or invalid. Logging out...');

      // Add your logout logic here, e.g., redirect to login page
      navigate("/sign-in");
    }
  }, [token]);

  return [token, setToken] as const;
}

export default useToken;
