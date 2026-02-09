const crypto = require("crypto");

const SALT = process.env.SALT || "default_salt_value";

function encryptPassword(password) {
  return crypto
    .createHash("md5")
    .update(SALT + password)
    .digest("hex");
}

module.exports = {
  encryptPassword,
};
