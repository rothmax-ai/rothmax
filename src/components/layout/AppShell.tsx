// src/components/layout/AppShell.tsx
"use client";

import React, { useState } from "react";
import Sidebar from "../../mosaic/partials/Sidebar.jsx";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {

  // Sidebar open by default on desktop, closed on mobile
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth >= 1024;
  });

  return (
    <div className="min-h-screen w-full flex bg-gray-50 relative">

      {/* SIDEBAR */}
      <Sidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* MAIN CONTENT */}
      <div className="flex flex-col flex-1 min-w-0 overflow-y-auto relative z-0">
        <main className="p-6 w-full">{children}</main>

        {/* FOOTER */}
        <footer className="py-10 text-center text-gray-600 text-xs space-y-2">
          <p>SIMULATION ONLY. NOT TAX ADVICE. AI.</p>

          <p className="space-x-4">
            <a href="/terms" className="underline hover:text-blue-600">
              Terms of Use
            </a>
            <a href="/privacy" className="underline hover:text-blue-600">
              Privacy Policy
            </a>
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