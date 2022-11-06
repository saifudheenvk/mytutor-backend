import jwt from 'jsonwebtoken';
import { Response, NextFunction } from "express";
import { checkUserPolicies } from '../services/user';

export function verifyToken (policy: string) {
  return async (req: any, res: Response, next: NextFunction) => {
    const token = req.header("Authorization");
    const companyId = req.header("company-id");
    if (!token) return res.status(401).send("Access Denied");
    try {
      const verified: any = jwt.verify(token, process.env.JWT_TOKEN as string);
      const userId: string = verified.userId;
      const policies = await checkUserPolicies(userId, companyId);
      if(policies.includes(policy)) next();
      else res.status(401).send("Un Authorized");
    } catch (err) {
      res.status(401).send("Invalid token");
    }
  };
};