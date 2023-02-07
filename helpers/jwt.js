const { expressjwt: jwt } = require("express-jwt");
function authJwt() {
  const secret = process.env.SECRET;
  const api = process.env.API_URL;
  const excludedPaths = [
    { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
    { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
    { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
    { url: /\/api\/v1\/orders(.*)/, methods: ["GET", "OPTIONS", "POST"] },
    `${api}/users/login`,
    `${api}/users/register`,
    // { url: /(.*)/ },
  ];

  return jwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [excludedPaths],
  });
}

async function isRevoked(req, token) {
  if (!token.payload.isAdmin) {
    console.log("Not admin");
    return true;
  }
  console.log("admin");
  return false;
}

module.exports = authJwt;
