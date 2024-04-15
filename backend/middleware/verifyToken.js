const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    next()
    return
  }
  // process.env.JWT_SECRET
  const decode = jwt.verify(token, 'shhhhh');
  req.userId = decode.userId;
  next()
}

module.exports = verifyToken
