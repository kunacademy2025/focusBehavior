import { PhoneNumberUtil } from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();

export const isPhoneValid = (phone: string) => {
  try {
    if (!phone) return false;

    const normalized = phone.replace(/\s+/g, "");
    if (normalized.length < 6 || !/^\+?\d{6,15}$/.test(normalized))
      return false;

    const parsed = phoneUtil.parseAndKeepRawInput(phone);

    return phoneUtil.isValidNumber(parsed);
  } catch (error: unknown) {
    console.error("Error validating phone number:", error);
    return false;
  }
};
