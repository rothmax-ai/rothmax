// src/components/layout/AppShell.tsx
"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../../mosaic/partials/Sidebar.jsx";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect breakpoint once + on resize
  useEffect(() => {
    function updateBreakpoint() {
      const desktop = window.innerWidth >= 1024; // Tailwind "lg"
      setIsDesktop(desktop);

      if (desktop) {
        setSidebarOpen(true);  // desktop always open
      } else {
        setSidebarOpen(false); // mobile initially closed
      }
    }

    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  return (
    <div className="min-h-screen w-full flex bg-gray-50 relative">

      {/* 🌟 SIDEBAR */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* 🌟 HAMBURGER BUTTON — ALWAYS visible if sidebar is closed on mobile */}
      {!isDesktop && !sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="
            fixed top-4 left-4 
            z-999999
            p-3 rounded-xl 
            bg-white shadow-md border border-gray-200
          "
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2}
            stroke='currentColor'
            className='w-6 h-6 text-gray-700'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M3 6h18M3 12h18M3 18h18' />
          </svg>
        </button>
      )}

      {/* 🌟 MAIN CONTENT */}
      <div className="flex flex-col flex-1 min-w-0 overflow-y-auto relative z-0">
        <main className="p-6 w-full">{children}</main>

        {/* 🌟 FOOTER */}
        <footer className="py-10 text-center text-gray-600 text-xs space-y-2">
          <p>SIMULATION ONLY. NOT TAX ADVICE. AI.</p>

          <p className="space-x-4">
            <a href="/terms" className="underline hover:text-blue-600">Terms of Use</a>
            <a href="/privacy" className="underline hover:text-blue-600">Privacy Policy</a>
          </p>

          <p>
            <a
              href="https://archive.org/details/orangutan-protocol-2020-08-08"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-blue-600"
            >
              Powered by the ORANGUTAN PROTOCOL 🦧
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}