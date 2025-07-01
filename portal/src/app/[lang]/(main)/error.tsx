"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-primary">500</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-dark_blue sm:text-5xl">
          Something went wrong!
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Whoops, this is embarassing. <br /> Looks like the page you were
          looking for has crashed.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            className="text-sm font-semibold text-dark_blue mx-4"
            onClick={() => reset()}
          >
            Try Again
          </button>
          <Link
            href="/"
            className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-light_orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mx-4"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
}
