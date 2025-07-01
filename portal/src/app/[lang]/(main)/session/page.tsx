import React from "react";

const Zoom = () => {
  return (
    <div className="relative w-full h-full">
      <div className="h-[100vh] pt-40 relative z-20">
        <div className="absolute top-0 inset-x-0 h-44 z-10 bg-gradient-to-b from-neutral-950/90 to-neutral-950/0 from-[30%]" />
        <iframe
          src="https://us05web.zoom.us/j/89399059353?pwd=tb6DeTghabZRMnXbBz8v1FaEbmL6wr.1"
          allow="camera; microphone; display-capture; fullscreen"
          className="w-full h-full border-none"
        ></iframe>
      </div>
    </div>
  );
};

export default Zoom;