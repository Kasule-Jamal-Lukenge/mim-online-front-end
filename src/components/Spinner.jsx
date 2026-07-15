import React from "react";

export default function Spinner({ size = 48, label, className = "" }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div
        className="spinner-ring rounded-full border-4 border-gray-200"
        style={{ width: size, height: size }}
      />
      {label && <p className="text-gray-500 text-sm">{label}</p>}
    </div>
  );
}
