// src/components/layout/AppShell.tsx
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
      {/* SIDEBAR (overlay on mobile, column on desktop) */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* MAIN CONTENT AREA */}
      <div className="flex flex-col flex-1 min-w-0 overflow-y-auto">
        <main className="p-6 w-full">
          {/* MOBILE MENU BUTTON — ALWAYS VISIBLE */}
          <button
            className="lg:hidden fixed top-4 left-4 z-9999 p-3 rounded-xl bg-white shadow-md border border-gray-200"
            onClick={() => setSidebarOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 6h18M3 12h18M3 18h18"
              />
            </svg>
          </button>

          {children}
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
              rel="noreferrer"
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