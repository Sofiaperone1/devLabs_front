'use client';
import React from 'react';
import './globals.css';
import { Providers } from '@/redux/providers';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/utils/theme'; // Importa el tema
import { CssBaseline } from '@mui/material';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Providers>
            <ThemeProvider theme={theme}>
              <CssBaseline /> {/* Resetea estilos base */}
              {children}
            </ThemeProvider>
          </Providers>
        </UserProvider>
      </body>
    </html>
  );
}
