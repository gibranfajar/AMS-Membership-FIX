"use client";

import "./globals.css";
import AppProviders from "@/context/AppProvider";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <title>AMS Membership</title>
      </head>
      <body className={`antialiased`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
