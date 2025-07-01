"use client";

import Link from "next/link";

import { FiThumbsUp } from "react-icons/fi";

export const ThankYou: React.FC<{
  title: string;
  message?: string;
  return_url?: string;
  onClose?: () => void;
}> = ({ title, message, return_url, onClose }) => {
  return (
    <section className="relative py-[50px] flex items-center justify-center text-center bg-gray-50 dark:bg-slate-800">
      <div className="container relative">
        <div className="grid grid-cols-1">
          <div className="title-heading text-center my-auto">
            <div className="size-24 bg-indigo-600/5 text-theme rounded-full text-5xl flex align-middle justify-center items-center shadow-sm dark:shadow-gray-800 mx-auto">
              <FiThumbsUp className="w-11 h-11" />
            </div>
            <h1 className="mt-6 mb-8 md:text-5xl text-3xl font-bold">
              {title}
            </h1>
            <p className="text-slate-400 max-w-xl mx-auto">{message}</p>

            <div className="mt-6">
              <Link
                onClick={() => onClose && onClose()}
                href={return_url || "/"}
                className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-light_dark_blue hover:bg-orange border-indigo-600/10 hover:border-orange text-white hover:text-white rounded-md"
              >
                {return_url ? "Back" : "Back to Home"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
