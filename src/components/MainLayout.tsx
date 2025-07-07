import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 overflow-y-auto bg-slate-100">
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
