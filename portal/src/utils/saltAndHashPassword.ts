import crypto from "crypto";

/**
 * Function to generate a salt and hash the password
 * @param password - The plaintext password to be hashed
 * @returns The hashed password
 */
export const saltAndHashPassword = (password: string): string => {
  // Generate a salt
  const salt = crypto.randomBytes(16).toString("hex");

  // Hash the password with the salt
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  // Combine the salt and hash to store them together
  const saltedHash = `${salt}:${hash}`;

  return saltedHash;
};

/**
 * Function to verify a password against a stored hash
 * @param password - The plaintext password to verify
 * @param storedHash - The stored salt and hash combination
 * @returns true if the password matches the hash, false otherwise
 */
export const verifyPassword = (
  password: string,
  storedHash: string
): boolean => {
  const [salt, hash] = storedHash.split(":");

  const hashToVerify = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  return hash === hashToVerify;
};
