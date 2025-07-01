"use server";

import { getServerSession } from "next-auth";
import { authOptions } from ".";

export const isAuthorized = async (): Promise<any | null> => {
  const data = getServerSession(authOptions);
  return data;
};
