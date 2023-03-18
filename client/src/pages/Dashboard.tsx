import axios from 'axios';
import React, { useEffect } from 'react'
import useAuth from '../hooks/useAuth';

type Props = {}

function Dashboard({}: Props) {
  const { logout, token } = useAuth();
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/api/test', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res);
      } catch (error) {
        console.log(error);
        logout();
      }
    })();
  }, []);
  return (
    <div>Dashboard 123</div>
  )
}

export default Dashboard