"use client";

import React, { useState } from "react";
import Sidebar from "../../mosaic/partials/Sidebar.jsx";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-gray-50">

      {/* SIDEBAR */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* MAIN CONTENT */}
      <div className="flex flex-col flex-1 min-w-0 overflow-y-auto">

        <main className="p-6 w-full">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="py-10 text-center text-gray-600 text-xs space-y-2">

          <p className="leading-tight">
            SIMULATION ONLY. NOT TAX ADVICE. AI.
          </p>

          <p className="space-x-4">
            <a href="/terms" className="underline hover:text-blue-600 transition">
              Terms of Use
            </a>

            <a href="/privacy" className="underline hover:text-blue-600 transition">
              Privacy Policy
            </a>
          </p>

          <p>
            <a
              href="https://archive.org/details/orangutan-protocol-2020-08-08"
              target="_blank"
              className="underline hover:text-blue-600 transition"
            >
              Powered by the ORANGUTAN PROTOCOL 🦧
            </a>
          </p>

        </footer>
      </div>
    </div>
  );
}