import { BarLoader } from "@/components/Loaders";
import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen w-full grid place-content-center">
      <BarLoader />
    </div>
  );
}
