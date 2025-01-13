import jwt from "jsonwebtoken";


export const authMiddleware = async (
  req,
  _res,
  next
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return _res.status(401).json({ message: "Unauthorized: Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    console.log("token:", authHeader);
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return _res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};
