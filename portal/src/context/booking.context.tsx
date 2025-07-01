"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const BookingContext = createContext<{
  bookingData: any;
  setBookingData: React.Dispatch<React.SetStateAction<any>>;
}>({
  bookingData: null,
  setBookingData: () => {},
});

export const BookingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [bookingData, setBookingData] = useState<any>(null);

  // Load bookingData from sessionStorage on initial mount
  useEffect(() => {
    const stored = sessionStorage.getItem("bookingData");
    if (stored) {
      try {
        setBookingData(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse bookingData from sessionStorage", e);
      }
    }
  }, []);

  // Save bookingData to sessionStorage when it changes
  useEffect(() => {
    if (bookingData !== null) {
      sessionStorage.setItem("bookingData", JSON.stringify(bookingData));
    }
  }, [bookingData]);

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
