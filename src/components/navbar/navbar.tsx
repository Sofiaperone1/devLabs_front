import React from 'react';
import LoginLogout from './LoginLogout';
import logo from '../../imgs/logo.png';
import Image from 'next/image';
import './navbar.css';
import TaskIcon from '@mui/icons-material/Task';
import { useUser } from '@auth0/nextjs-auth0/client';
import styled from 'styled-components';

const CustomNavbar = styled.div`
  color: black;
  border-bottom: 1px solid #ffffff59;
  width: 100%;
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CTaskIcon = styled.a`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  right: 8%;
  top: 4%;
  justify-content: space-between;
  font-size: 0.7rem;
  svg {
    margin-bottom: 20%;
  }
`;

const Navbar = () => {
  const { user } = useUser();

  return (
    <CustomNavbar>
      <Image src={logo} alt="logo" width={100} height={80} />
      {user && (
        <CTaskIcon href="/tasks">
          <TaskIcon />
          Tasks
        </CTaskIcon>
      )}
      <LoginLogout />
    </CustomNavbar>
  );
};

export default Navbar;
