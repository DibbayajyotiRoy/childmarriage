import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar"; // Correct import path

/**
 * MainLayout provides a consistent structure for pages that need a sidebar.
 * It renders the sidebar and a main content area where the routed page component
 * will be displayed via the <Outlet /> component.
 */
const MainLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-white">
      {/* The persistent sidebar */}
      <Sidebar />

      {/* The main content area that changes based on the route */}
      <div className="flex-1 overflow-y-auto bg-slate-100">
        <main className="p-4 sm:p-6 md:p-8">
          {/* Outlet is a placeholder where React Router will render the matched child route component */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
