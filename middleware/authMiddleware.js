import jwt from "jsonwebtoken";

class authMiddleware {
  static verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).send("Empty or invalid token");
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      console.log("error at verifyToken");

      res.status(400).send("invalid token");
    }
  }
}

export default authMiddleware;
