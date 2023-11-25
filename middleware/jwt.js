const { sign, verify } = require("jsonwebtoken");
const jwk = "your_secret_key";

const createTokens = (user) => {
  const expiresIn = 60*60*24
  const accessToken = sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    jwk,
    {expiresIn:expiresIn}
  );
  return accessToken;
};

const extractToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  if (accessToken) {
    const decodedToken = verify(accessToken, jwk);
    req.user = decodedToken;
  } else {
    req.user = null;
  }
  return next();
};

// if needed !!
const verifyTokens = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  if (!accessToken) {
    res.status(200).json({ message: "login please" });
    //return next();
  }
  try {
    const validToken = verify(accessToken, jwk);
    if (validToken) {
      // req.authenticated = true
      req.user = validToken;
      return next();
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTokens,
  extractToken,
  verifyTokens,
};
