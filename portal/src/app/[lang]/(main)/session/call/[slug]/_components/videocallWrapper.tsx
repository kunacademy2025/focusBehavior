"use client";

import dynamic from "next/dynamic";

const Videocall = dynamic<{ slug: string; JWT: string }>(
  () => import("@/components/zoom/components/Videocall"),
  { ssr: false }
);

interface VideocallWrapperProps {
  slug: string;
  JWT: string;
}

export default function VideocallWrapper({ slug, JWT }: VideocallWrapperProps) {
  return <Videocall slug={slug} JWT={JWT} />;
}
