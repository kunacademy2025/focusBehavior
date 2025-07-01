import { SearchParams } from "@/types";
import React from "react";
import ReactVideoPlayer from "./_components/ReactVideoPlayer";

type Params = Promise<{ lang: string; slug: string }>;

const Page = async ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const { slug, lang } = await params;
  const videoUrl =
    searchParams.url || "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  return (
    <div className="flex h-[70vh] flex-col items-center justify-between p-24 mt-20">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-neutral-950/90 to-neutral-950/0 from-[30%] h-32" />
      <div className="relative z-10 w-full h-full max-w-7xl">
        <ReactVideoPlayer url={videoUrl} />
      </div>
    </div>
  );
};

export default Page;
