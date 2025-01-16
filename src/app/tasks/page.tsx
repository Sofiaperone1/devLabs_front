'use client';
import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import AddTaskChip from '../../components/chips/AddTaskChip';
import ListComponent from '../../components/listComponent/ListComponent';
import Navbar from '@/components/navbar/navbar';
import './task.css';
import Footer from '@/components/footer/footer';

import CircularProgress from '@mui/material/CircularProgress';

const Tasks = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  if (isLoading) {
    return (
      <div id="isLoading">
        <CircularProgress color="secondary" size="5rem" />
      </div>
    );
  }

  if (!user) {
    router.push('/api/auth/login?returnTo=/tasks');
    return null;
  }

  // Renderiza si está autenticado
  return (
    <div>
      <Navbar />
      <div className="tasksCont">
        <AddTaskChip />
        <ListComponent />
      </div>
      <Footer />
    </div>
  );
};

export default Tasks;
