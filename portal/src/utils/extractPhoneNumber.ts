import { parsePhoneNumberFromString } from "libphonenumber-js";

export const extractPhoneNumber = (
  fullPhoneNumber: any,
  defaultCountry: any = "LB"
) => {
  if (typeof fullPhoneNumber !== "string" || fullPhoneNumber.trim() === "")
    return "";

  try {
    const phoneNumber: any = parsePhoneNumberFromString(
      fullPhoneNumber,
      defaultCountry
    );
    return phoneNumber ? phoneNumber.formatInternational() : "";
  } catch (error) {
    console.error("Error parsing phone number:", error);
    return "";
  }
};
