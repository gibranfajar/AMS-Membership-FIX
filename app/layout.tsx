"use client";

import { useEffect } from "react";
import "./globals.css";
import AppProviders from "@/context/AppProvider";

interface FullscreenElement extends HTMLElement {
  mozRequestFullScreen?: () => void;
  webkitRequestFullscreen?: () => void;
  msRequestFullscreen?: () => void;
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    // Menunggu interaksi pertama dari pengguna untuk memulai fullscreen
    const enterFullScreen = () => {
      const element = document.documentElement as FullscreenElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen(); // Firefox
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(); // Chrome, Safari, Opera
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen(); // IE/Edge
      }
    };

    // Hanya masukkan fullscreen setelah interaksi pengguna pertama kali
    const handleUserInteraction = () => {
      enterFullScreen();
      document.removeEventListener("click", handleUserInteraction); // Hapus listener setelah digunakan
    };

    // Tambahkan event listener pada click untuk memulai fullscreen
    document.addEventListener("click", handleUserInteraction);

    // Pastikan event listener dibersihkan saat komponen unmount
    return () => {
      document.removeEventListener("click", handleUserInteraction);
    };
  }, []);

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
