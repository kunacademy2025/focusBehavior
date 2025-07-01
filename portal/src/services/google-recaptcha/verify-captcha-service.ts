"use server";

import { RECAPTCHA_SECRET_KEY } from "@/config";

export async function verifyCaptchaAction(token: string): Promise<boolean> {
  const secret = RECAPTCHA_SECRET_KEY;

  if (!secret) {
    console.error("Recaptcha secret key is not defined.");
    return false;
  }

  const endpoint = `https://www.google.com/recaptcha/api/siteverify`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }).toString(),
    });

    if (!response.ok) {
      console.error("Recaptcha verification failed. Status:", response.status);
      return false;
    }

    const result = await response.json();
    return result.success || false;
  } catch (error) {
    console.error("Error verifying Recaptcha:", error);
    return false;
  }
}
