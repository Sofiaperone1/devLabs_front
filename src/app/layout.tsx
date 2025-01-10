"use client";
import React from "react"
import "./globals.css";
import { Providers } from "@/redux/providers";
//import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          <Providers>
            {children}
          </Providers>
      </body>
    </html>
  );
}

/* <UserProvider>
          <Providers>
            {children}
          </Providers>
        </UserProvider>*/
