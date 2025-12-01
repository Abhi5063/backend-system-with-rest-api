const jwt = require("jsonwebtoken");

exports.identifier = (req, res, next) => {
  let token;

  // Handle different clients
  if (req.headers.client === "not-browser") {
    token = req.headers.authorization;
  } else {
    token = req.cookies["Authorization"];
  }

  // No token found
  if (!token) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    // Support both "Bearer <token>" and "<token>"
    const userToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;

    // Verify JWT
    const jwtVerified = jwt.verify(userToken, process.env.TOKEN_SECRET);

    req.user = jwtVerified;
    next();
  } catch (error) {
    console.log(error);

    // Expired token
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please login again.",
      });
    }

    // Invalid token
    return res.status(401).json({
      success: false,
      message: "Invalid token. Access denied.",
    });
  }
};
