import jwt, { JwtPayload } from 'jsonwebtoken';
import { Response, NextFunction } from "express";

module.exports = (policy: string) => {
  return (req: any, res: Response, next: NextFunction) => {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("Access Denied");
    try {
      const options = {
        maxAge: "2d",
      };
      const secret:string = process.env.JWT_TOKEN||"";
      const verified = jwt.verify(token, secret, options);
    } catch (err) {
      res.status(400).send("Invalid token");
    }
  };
};