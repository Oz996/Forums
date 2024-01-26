import jwt from "jsonwebtoken";

export function isAuthenticated(req: any) {
  const token = req.cookies.get("token");
  const secretKey = process.env.SECRET_KEY;

  try {
    if (token) {
      const decoded = jwt.verify(token, secretKey!);
      if (decoded) {
        return true;
      }
    }
  } catch (error) {
    console.error("Token verification failed");
  }
  return false;
}
