/*import { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useDispatch } from 'react-redux';
import { setToken, clearToken } from '../redux/features/authSlice'; // Asegúrate de importar correctamente

const useAuth = () => {
  const { user, isLoading } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        if (user) {
          const response = await fetch('/api/auth/token');
          const { accessToken } = await response.json();
          dispatch(setToken(accessToken)); // Guarda el token en Redux
        } else {
          dispatch(clearToken());
        }
      } catch (error) {
        console.error('Error obteniendo el token:', error);
      }
    };

    if (!isLoading) {
      fetchToken();
    }
  }, [user, isLoading, dispatch]);
};

export default useAuth;
*/
