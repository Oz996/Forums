import jwt from "jsonwebtoken";

export function isAuthenticated(req: any) {
  const tokenObject = req.cookies.get("token");
  const secretKey = process.env.SECRET_KEY;

  try {
    if (tokenObject) {
      const token = tokenObject.value;
      const decoded = jwt.verify(token, secretKey!);

      if (decoded) {
        return true;
      }
    }
  } catch (error: any) {
    console.error("Token verification failed", error.message);
  }
  return false;
}
