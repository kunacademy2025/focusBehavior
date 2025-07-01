import { HiAtSymbol } from "react-icons/hi";
export const formatEmail = (email: string) => {
  if (!email) return null;

  const parts = email.split("@");

  if (parts.length !== 2) return email;
  
  return (
    <span className="flex items-center">
      {parts[0]}
      <HiAtSymbol className="relative h-5" />
      {parts[1]}
    </span>
  );
};
