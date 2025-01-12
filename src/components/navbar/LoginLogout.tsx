import React, { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import './navbar.css';
import PersonIcon from '@mui/icons-material/Person';

type Props = object;

const LoginLogout = ({}: Props) => {
  const { error, isLoading, user } = useUser();

  useEffect(() => {
    console.log(user, 'entro primero');

    if (error) {
      console.error('Auth0 Error:', error.message); // Esto ayuda a depurar si hay errores reales.
    }
  }, [error, user]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (isLoading) {
    return <div>Cargando usuario ...</div>;
  }

  console.log({ user });

  return (
    <div className="loginLogout">
      {!user && (
        /* eslint-disable @next/next/no-html-link-for-pages */
        <a href="/api/auth/login?returnTo=/tasks">
          <PersonIcon /> Log in
        </a>
        /* eslint-enable @next/next/no-html-link-for-pages */
      )}
      {user && (
        /* eslint-disable @next/next/no-html-link-for-pages */
        <a href="/api/auth/logout">
          <PersonIcon /> Log out
        </a>
        /* eslint-enable @next/next/no-html-link-for-pages */
      )}
    </div>
  );
};

export default LoginLogout;
