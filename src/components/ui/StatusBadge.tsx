import React from "react";


export const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles: {
    [key: string]: { text: string; bg: string; dot: string };
  } = {
    Reported: { text: "text-blue-700", bg: "bg-blue-100", dot: "bg-blue-500" },
    "Under Investigation": {
      text: "text-yellow-700",
      bg: "bg-yellow-100",
      dot: "bg-yellow-500",
    },
    Resolved: {
      text: "text-green-700",
      bg: "bg-green-100",
      dot: "bg-green-500",
    },
  };
  const style = statusStyles[status] || statusStyles["Reported"];
  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${style.bg} ${style.text}`}
    >
      <span className={`w-2 h-2 mr-2 rounded-full ${style.dot}`}></span>
      {status}
    </div>
  );
};