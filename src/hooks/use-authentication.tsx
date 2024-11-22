import { useState, useEffect } from 'react';

export default function useAuthentication() {
  const key:string="jwt";  
  const [jwtToken, setJwtToken] = useState(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue);
    }
    return {token:""};
  });

  useEffect(() => {
    if (jwtToken === undefined) return;
    localStorage.setItem(key, JSON.stringify(jwtToken));
    // localStorage.setItem(key, jwtToken);
  }, [jwtToken, key]);

  return [jwtToken, setJwtToken];
}

