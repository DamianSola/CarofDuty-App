"use client";

import Sidebar from "./Sidebar";

export default function AdminShell({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-body lg:flex-row">
      <Sidebar />
      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
