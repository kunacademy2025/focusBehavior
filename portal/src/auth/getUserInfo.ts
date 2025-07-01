"use server";
import { isAuthorized } from "@/auth";
import UserModel from "@/models/User.model";

type UserSession = {
  user: UserModel | null;
  jwt: string | null;
};

export const getUserInfo = async (): Promise<UserSession> => {
  try {
    const session = await isAuthorized();

    if (session && session.user) {
      const user = session.user.user || null;
      const jwt = session.user.jwt || null;

      return { user, jwt };
    } else {
      return { user: null, jwt: null };
    }
  } catch (error) {
    console.error("Error fetching session:", error);
    return { user: null, jwt: null };
  }
};
