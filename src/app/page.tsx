"use client"
import React from "react";
import Image from "next/image";
import "./page.module.css";
import Navbar from "../components/navbar/navbar";
import b1 from "../imgs/b1.png"
import b2 from "../imgs/b2.png"
import calendar from "../imgs/calendar.png"
import Footer from "../components/footer/footer";
import TaskIcon from '@mui/icons-material/Task';


export default function Home() {
  
  return (
    <div className="home_cont">
      <Navbar/>
      <div className="imgs_cont" >
        <div className="semi_imgs_cont">
        <Image src={b1} className="brand1" alt="brand1"></Image>
        <Image src={b2} className="brand2" alt="brand2"></Image>
        </div>
        <a className='taskIcon' href='/tasks'><TaskIcon/>Tasks</a>
      <Image src={calendar} alt="brand"></Image>
      </div>
      <Footer/>
      </div>
  );
}

//  { user && <a className='taskIcon' href='/tasks'><TaskIcon/>Tasks</a> ,       <LoginLogout />}