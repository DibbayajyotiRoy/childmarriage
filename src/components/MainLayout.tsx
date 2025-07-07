import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

const MainLayout = () => {
  return (
    <div className="flex h-screen w-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 min-w-0">
        {/* The Outlet will render the component for the current route */}
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
