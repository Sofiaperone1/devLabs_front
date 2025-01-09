/*"use client";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import AddTaskChip from "@/components/AddTaskChip";
import ListComponent from "@/components/ListComponent";
import Navbar from "@/components/navbar/navbar";
import "./task.css"
import Footer from "@/components/footer/footer";

const Tasks = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  // Mientras se verifica la autenticación
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Si el usuario no está autenticado, redirige al login
  if (!user) {
    router.push("/api/auth/login?returnTo=/tasks");
    return null; // Evita renderizar mientras redirige
  }

  // Renderiza si está autenticado
  return (
    <div>
      <Navbar />
      <div className="tasksList">
        <AddTaskChip />
        <ListComponent/>
      </div>
      <Footer/>
    </div>
  );
};

export default Tasks;*/

import React from 'react'

const page = () => {
  return (
    <div>TASKS</div>
  )
}

export default page