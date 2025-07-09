import React from "react";

// Define the props interface for type safety and clarity
interface MemberStatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  textColor: string;
  bgColor: string;
}

export const MemberStatCard: React.FC<MemberStatCardProps> = ({
  title,
  value,
  icon,
  textColor,
  bgColor,
}) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200/80">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm font-semibold text-slate-500">{title}</h3>
        <p className={`text-3xl font-bold mt-1 ${textColor}`}>{value}</p>
      </div>
      <div className={`p-3 rounded-full ${bgColor}`}>{icon}</div>
    </div>
  </div>
);
