'use client';
import React from 'react';
import Image from 'next/image';
import './home.css';
import Navbar from '../components/navbar/navbar';
import calendar from '../imgs/calendar.png';
import Footer from '../components/footer/footer';
import { useAuth } from '../redux/features/authSlice'; // Importa el hook

export default function Home() {
  useAuth(); // Ejecuta el hook
  return (
    <div className="home_cont">
      <Navbar />
      <div className="imgs_cont">
        <div className="semi_imgs_cont">
          <p>
            Small goals,
            <span>big satisfactions</span>
          </p>
          <p>our app turns your lists into achievements</p>
        </div>
        <Image src={calendar} alt="brand"></Image>
      </div>
      <Footer />
    </div>
  );
}

//  { user && <a className='taskIcon' href='/tasks'><TaskIcon/>Tasks</a> ,       <LoginLogout />}
