const jwt = require("jsonwebtoken");

const verifytoken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.json({ message: "No token provided" });
  }

const token = authHeader.split(" ")[1];
console.log(req.headers.authorization);
  try {
    const decoded = jwt.verify(token, "SECRETKEY");
    req.user = decoded;
    next(); 
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = verifytoken;