"use client";
import { useEffect } from "react";
import ReactPixel from "react-facebook-pixel";
import sha256 from "crypto-js/sha256";

const hashSHA256 = (value: string): string => {
  return sha256(value.trim().toLowerCase()).toString();
};

const PurchaseTracker = ({
  price,
  eventId,
  email,
  phone,
  clientIP,
}: {
  price: number;
  eventId: number;
  email: string;
  phone: string;
  clientIP: string | null;
}) => {
  useEffect(() => {
    if (!clientIP || !email || !phone) return;

    const hashedEmail = hashSHA256(email);
    const hashedPhone = hashSHA256(phone);

    const userAgent =
      typeof window !== "undefined" ? window.navigator.userAgent : "";

    ReactPixel.trackCustom("Purchase", {
      value: price, // total price
      currency: "AED", // "AED", etc.
      content_ids: [eventId], // event ID
      content_type: "event",
      email: hashedEmail,
      phone: hashedPhone,
      client_ip_address: clientIP ?? "",
      client_user_agent: userAgent,
    });
  }, [price, eventId, email, phone, clientIP]);
  return null;
};

export default PurchaseTracker;
