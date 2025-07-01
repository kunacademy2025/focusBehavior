"use client";

import ReactPlayer from "react-player";

interface ReactVideoPlayerProps {
  url: string;
}

export default function ReactVideoPlayer({ url }: ReactVideoPlayerProps) {
  return (
    <ReactPlayer
      url={url}
      controls
      width="100%"
      height="100%"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
