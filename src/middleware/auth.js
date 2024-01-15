const jwt = require("jsonwebtoken");

async function authenticateToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  //   console.log("MY TOKEN ", token);

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  await jwt.verify(token, "instahyre_secret", (error, user) => {
    if (error) return res.status(403).json({ error: "Forbidden" });
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
