import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center bg-white wrapper h-screen m-0">
      <div className="dot"></div>
      <span className="text">Loading</span>
    </div>
  );
};