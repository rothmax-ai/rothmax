"use client";

import React, { useState } from "react";
import Sidebar from "../../mosaic/partials/Sidebar.jsx";

// ✅ FIX: declare the type for children
interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen w-full bg-gray-50">

      {/* SIDEBAR (fixed column, scrolls independently) */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* MAIN AREA (scroll container) */}
      <div className="flex flex-col flex-1 min-w-0 overflow-y-auto">

        {/* CONTENT should NOT be max-w-4xl here */}
        <main className="p-6 w-full flex justify-center">
          <div className="w-full px-4 max-w-[1400px]">
            {children}
          </div>
        </main>

        {/* FOOTER */}
        <footer className="py-10 text-center text-gray-600 text-xs space-y-2">

  {/* Legal disclaimer */}
  <p className="leading-tight">
    SIMULATION ONLY. NOT TAX ADVICE. AI.
  </p>

  {/* Legal links */}
  <p className="space-x-4">
    <a
      href="/terms"
      className="underline hover:text-blue-600 transition"
    >
      Terms of Use
    </a>

    <a
      href="/privacy"
      className="underline hover:text-blue-600 transition"
    >
      Privacy Policy
    </a>
  </p>

  {/* Orangutan Protocol link */}
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