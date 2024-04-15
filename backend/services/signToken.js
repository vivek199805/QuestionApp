const jwt = require('jsonwebtoken');

const generateJWTToken = (userId) => {
  const accessToken = jwt.sign({userId}, 'shhhhh', {expiresIn: "30d",});
  return accessToken;
};

module.exports = generateJWTToken
