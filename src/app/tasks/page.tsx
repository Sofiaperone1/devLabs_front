'use client';
import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import AddTaskChip from '../../components/chips/AddTaskChip';
import ListComponent from '../../components/listComponent/ListComponent';
import Navbar from '@/components/navbar/navbar';
import './task.css';
import Footer from '@/components/footer/footer';
import { useAuth } from '../../redux/features/authSlice';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Tasks = () => {
  useAuth(); // Ejecuta el hook
  const { user, isLoading } = useUser();
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);
  const [isTokenReady, setIsTokenReady] = useState(false);

  useEffect(() => {
    if (token) {
      setIsTokenReady(true);
    }
  }, [token]);

  if (isLoading || !isTokenReady) {
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
