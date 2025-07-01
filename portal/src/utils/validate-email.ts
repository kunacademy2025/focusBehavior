import { useMemo } from "react";

export const validateEmail = (value: string): boolean =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

export const useIsInvalidEmail = (value: string): boolean => {
  return useMemo(() => {
    if (value === "") return false;
    return validateEmail(value) ? false : true;
  }, [value]);
};
