import React from "react";
import { Link } from "react-router-dom";

// This is a basic placeholder. You should replace this with your actual Sidebar component.
export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-slate-200">
      <div className="h-full p-4">
        <h2 className="text-xl font-bold mb-4">Navigation</h2>
        <nav>
          <ul>
            <li>
              <Link
                to="/dashboard/member"
                className="block p-2 rounded hover:bg-slate-100"
              >
                Member Dashboard
              </Link>
            </li>
            {/* Add other links here */}
          </ul>
        </nav>
      </div>
    </aside>
  );
};
