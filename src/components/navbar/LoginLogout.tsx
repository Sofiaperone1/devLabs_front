/*import React, {useEffect} from 'react'
import { Button } from '@mui/material'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0/client'
import "./navbar.css"
import PersonIcon from '@mui/icons-material/Person';

type Props = {}

const LoginLogout = ({} : Props) => {

const {error, isLoading, user} = useUser();

useEffect(() => {
    console.log(user, "entro primero")

    if (error) {
      console.error("Auth0 Error:", error.message); // Esto ayuda a depurar si hay errores reales.
    }
  }, [error]);

if (error) {
    return <div>
        Error: {error.message}
    </div>
}
if (isLoading) {
    return <div>
        Cargando usuario ...
    </div>
}

console.log ({user});

  return (
    <div className='loginLogout'>
        {!user && (  <a href='/api/auth/login?returnTo=/tasks'> <PersonIcon/> Log in</a> ) }

        {user && ( <a href='/api/auth/logout'><PersonIcon/> Log Out</a>)}
    </div>
  )
}

export default LoginLogout
*/