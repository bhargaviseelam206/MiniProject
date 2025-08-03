const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;

const authMiddleware = (req, res, next) => {

  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), jwtSecretKey);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT verification failed: ", error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired." });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(400).json({ message: "Invalid token." });
    }S
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = authMiddleware;
