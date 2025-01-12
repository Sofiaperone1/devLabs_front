import React from 'react';
import LoginLogout from './LoginLogout';
import logo from '../../imgs/logo.png';
import Image from 'next/image';
import './navbar.css';
import TaskIcon from '@mui/icons-material/Task';
import { useUser } from '@auth0/nextjs-auth0/client';

const Navbar = () => {
  const { user } = useUser();

  return (
    <div className="navbar">
      <Image src={logo} alt="logo" width={100} height={80} />
      {user && (
        <a className="taskIcon" href="/tasks">
          <TaskIcon />
          Tasks
        </a>
      )}
      <LoginLogout />
    </div>
  );
};

export default Navbar;
