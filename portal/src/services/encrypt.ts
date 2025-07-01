"use server";

import * as crypto from "node:crypto";

const passwords: string[] = [
  "FocusBehavior.ae_encryption_key",
  process.env.SITE_URL || "https://focusbehevior.com",
];

const algorithm = "aes-192-cbc";
const salt = "salt";
const iv = Buffer.alloc(16, 0);

export async function encrypt(source: string) {
  const key = crypto.scryptSync(passwords[0], "salt", 24);
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(source, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted.toString();
}

export async function decrypt(value: string) {
  for (const password of passwords) {
    try {
      if (!password) continue; // Skip if the password is empty
      const key = crypto.scryptSync(password, salt, 24);
      const decipher = crypto.createDecipheriv(algorithm, key, iv);

      let decrypted = decipher.update(value, "hex", "utf8");
      decrypted += decipher.final("utf8");
      return decrypted; // Return if successful
    } catch (error) {
      console.warn(
        `Decryption failed with password "${password}":`,
        error.message
      );
    }
  }

  console.error("Decryption failed with all provided passwords.");
  return null;
}
