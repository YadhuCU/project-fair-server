const jwt = require("jsonwebtoken");
const JWT_PASSWORD = process.env.JWT_PASSWORD;

const jwtMiddleware = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (token) {
      const payload = jwt.verify(token, JWT_PASSWORD);
      req.payload = payload.userId;
      next();
    } else {
      res.status(401).json("Please provide token");
    }
  } catch (err) {
    console.log("err", err);
    res.status(403).json("Please login");
  }
};

module.exports = jwtMiddleware;
