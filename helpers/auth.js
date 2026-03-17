import bcrypt from "bcrypt";

async function createHashPassword(password) {
  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function verifyPassword(plain_password, hashed_password) {
  const verified = await bcrypt.compare(plain_password, hashed_password);
  return verified
}
 
export { createHashPassword, verifyPassword };