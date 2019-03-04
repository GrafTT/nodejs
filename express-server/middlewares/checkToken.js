import jwt from "jsonwebtoken";

export default function checkToken(req, res, next) {
  let token = req.headers["x-access-token"];
  console.log(token);

  if (token) {
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        console.log(err);
        res.json({ success: false, msg: "Failed to auth token." });
      } else {
        next();
      }
    });
  } else {
    res.status(403).json({ success: false, msg: "No token provided." });
  }
}
