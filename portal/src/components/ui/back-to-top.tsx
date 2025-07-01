"use client";
import { useScrollDirection } from "@/hooks";
import React, { useRef, useEffect } from "react";

export const BackToTop = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const scrollDirection = useScrollDirection(elementRef.current);
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <div ref={elementRef}>
        <button
          title="top"
          type="button"
          className={`scroll-to-target fixed bottom-[5.5rem] rtl:left-12 ltr:right-12 w-12 h-12 text-lg rounded-full z-[99] text-white bg-secondary transition-opacity duration-1000 ease-in-out ${
            scrollDirection === "down" ? "opacity-100" : "opacity-0"
          }`}
        >
          <i className="fas fa-angle-up"></i>
        </button>
      </div>
    </>
  );
};
