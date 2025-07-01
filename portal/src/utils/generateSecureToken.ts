import jwt from "jsonwebtoken";

const SECRET = process.env.API_ACCESS_TOKEN; // Keep this safe!

export function generateSecureToken(payload: Record<string, any>, expiresIn = "15m") {
  return jwt.sign(payload, SECRET, { expiresIn });
}
