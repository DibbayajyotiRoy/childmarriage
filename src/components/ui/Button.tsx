import React from "react";

export const Button = ({
  children,
  onClick,
  variant = "primary",
  icon,
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
  icon?: React.ReactNode;
}) => {
  const baseClasses =
    "inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 focus:ring-blue-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };
  return (
    <button onClick={onClick} className={`${baseClasses} ${variants[variant]}`}>
      {icon}
      {children}
    </button>
  );
};
