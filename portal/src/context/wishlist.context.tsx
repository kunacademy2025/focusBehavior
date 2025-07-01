"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { addToWishlist, removeFromWishlist, getWishlist } from "@/actions";
import { getStrapiData, getStrapiId } from "@/utils";

interface WishlistContextType {
  wishlist: number[]; // Array of course IDs in the wishlist
  fetchWishlist: (userId: number) => Promise<void>; // Fetch wishlist from Strapi
  toggleCourseInWishlist: (userId: number, courseId: number) => Promise<void>;
  isCourseInWishlist: (courseId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [wishlist, setWishlist] = useState<number[]>([]);

  const fetchWishlist = async (userId: number) => {
    try {
      const response = await getWishlist(userId);

      const courseIds =
        response?.data?.data.map((item: any) => {
          const { course } = getStrapiData(item);
          const courseId = getStrapiId(course);
          return courseId;
        }) || [];

      setWishlist(courseIds);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setWishlist([]);
    }
  };

  const toggleCourseInWishlist = async (userId: number, courseId: number) => {
    try {
      if (isCourseInWishlist(courseId)) {
        await removeFromWishlist(userId, courseId);
        setWishlist((prev) => prev.filter((id) => id !== courseId));
      } else {
        await addToWishlist(userId, courseId);
        setWishlist((prev) => [...prev, courseId]);
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  const isCourseInWishlist = (courseId: number) => {
    return Array.isArray(wishlist) && wishlist.includes(courseId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        fetchWishlist,
        toggleCourseInWishlist,
        isCourseInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
