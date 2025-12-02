const jwt = require("jsonwebtoken");

exports.identifier = (req, res, next) => {
  let token = null;

  // Try token from Authorization header
  if (req.headers.authorization) {
    const parts = req.headers.authorization.split(" ");
    token = parts.length === 2 ? parts[1] : parts[0];
  }

  // Try token from cookies
  if (!token && req.cookies.Authorization) {
    const parts = req.cookies.Authorization.split(" ");
    token = parts.length === 2 ? parts[1] : parts[0];
  }

  // Still no token → Unauthorized
  if (!token) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    // Verify JWT
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = decoded; // add user info to request
    next();
  } catch (error) {
    console.log(error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please login again.",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid token. Access denied.",
    });
  }
};
