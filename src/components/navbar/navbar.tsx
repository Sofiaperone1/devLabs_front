import React from 'react'
//import LoginLogout from './LoginLogout'
import logo from "../../imgs/logo.png"
import Image from 'next/image'
import "./navbar.css"
//import TaskIcon from '@mui/icons-material/Task';
//import Link from 'next/link'
//import { useUser } from '@auth0/nextjs-auth0/client'

const Navbar = () => {

 //   const {error, isLoading, user} = useUser();

    return(
        <div className="navbar">
        <Image src={logo} alt="logo" width={100} height={80} />
  
        </div>
    )
    
}

export default Navbar

/*     { user && <a className='taskIcon' href='/tasks'><TaskIcon/>Tasks</a>  }
       <LoginLogout />*/