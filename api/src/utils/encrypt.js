const crypto = require("node:crypto");

const password = "FocusBehavior.ae_encryption_key";
const algorithm = "aes-192-cbc";

async function encrypt(source) {
  const key = crypto.scryptSync(password, "salt", 24);
  const iv = Buffer.alloc(16, 0);
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(source, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted.toString();
}

async function decrypt(value) {
  const key = crypto.scryptSync(password, "salt", 24);
  const iv = Buffer.alloc(16, 0);
  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  let decrypted = decipher.update(value, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

module.exports = {
  encrypt,
  decrypt,
};
