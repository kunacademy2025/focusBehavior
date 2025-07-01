import Link from "next/link";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export const FloatingWhatsapp = ({
  whatsapp_link,
}: {
  whatsapp_link?: string;
}) => {
  return (
    <Link
      href={whatsapp_link || "#"}
      target="_blank"
      rel="nofollow"
      className="fixed bottom-8 rtl:left-12 ltr:right-12 z-[99]"
      aria-label="Contact us on WhatsApp"
    >
      <div className="group relative flex items-center">
        {/* Tooltip Text */}
        {/* <span className="absolute right-16 bg-primary text-white text-sm px-4 py-2 rounded-lg shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 group-hover:animate-slideIn transition-all duration-300 whitespace-nowrap">
          Expert advice just a click away! <br /> Contact us now!
        </span> */}

        {/* WhatsApp Icon */}
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg text-white transition-transform duration-300 transform group-hover:animate-bounceHover">
          <FaWhatsapp className="w-8 h-8" />
        </div>
      </div>
    </Link>
  );
};
