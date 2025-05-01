const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;

// Middleware for Authentication and Authorization
const authMiddleware = (req, res, next) => {
  // Retrieve the token from the Authorization header
  const token = req.header("Authorization");

  // Check if the token is provided
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // Validate the token and decode the user info
    const decoded = jwt.verify(token.replace("Bearer ", ""), jwtSecretKey);
    
    // Attach the decoded user to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Log the error for debugging purposes
    console.error("JWT verification failed: ", error);

    // Handle different types of JWT errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired." });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(400).json({ message: "Invalid token." });
    }

    // Generic error message for any other issue
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = authMiddleware;
