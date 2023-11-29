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

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const decoded = verify(token, jwk);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ error: 'Invalid Token' });
  }
};
module.exports = {
  createTokens,
  authenticateToken
};
