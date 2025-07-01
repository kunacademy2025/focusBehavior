import { useApp } from "@/context";

export const useUserInfo = () => {
  const { state, logout } = useApp();

  const user = state.user ? state.user.user : null;
  const jwt = state.user ? state.user.jwt : null;

  return { user, jwt, logout, loggedIn: state.loggedIn };
};
