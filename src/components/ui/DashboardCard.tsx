import React from "react";


export const DashboardCard = ({
  title,
  icon,
  children,
  className,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white p-6 rounded-xl shadow-sm border border-slate-200/80 h-full ${className}`}
  >
    <div className="flex items-center gap-3 mb-4">
      {icon}
      <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
    </div>
    <div className="text-sm text-slate-600 space-y-3">{children}</div>
  </div>
);
