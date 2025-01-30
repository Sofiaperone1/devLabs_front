import React, { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import styled from 'styled-components';
import PersonIcon from '@mui/icons-material/Person';
import { Box } from '@mui/material';

const LoginLogoutContainer = styled(Box)`
  position: absolute;
  right: 2%;
  top: 4%;

  a {
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.7rem;
    text-decoration: none;
    justify-content: space-between;
    transition: color 0.3s ease;

    &:hover {
      color: violet;
    }

    svg {
      margin-bottom: 13%;
    }
  }
`;

const LoginLogout = () => {
  const { error, user } = useUser();

  useEffect(() => {
    if (error) {
      console.error('Auth0 Error:', error.message);
    }
  }, [error, user]);
  return (
    <LoginLogoutContainer className="loginLogout">
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
    </LoginLogoutContainer>
  );
};

export default LoginLogout;
