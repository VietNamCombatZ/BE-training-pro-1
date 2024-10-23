
import { userRepository } from "../api/user/userRepository";

import { NextFunction, Request, Response } from 'express';

import { verifyJwt } from '../services/jwtService';

interface AuthenticatedRequest extends Request {
  user?: string | object;
}


export const authenticate = {
  async authenticateJWT(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      const decoded = verifyJwt(token);
      if (!decoded) {
        res.sendStatus(401);
        return;
      }
      console.log("decoded", decoded);
      req.body.user = decoded;
      next();
    } else {
      res.sendStatus(401);
    }
  },

  async authenticateAdmin(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      const decoded = verifyJwt(token);
      if (!decoded) {
        res.sendStatus(401);
        return;
      }
      console.log("decoded", decoded);
      req.body.user = decoded;

      const User = await userRepository.findByIdAsync(decoded.id);
      if (!User) {
        res.sendStatus(401);
        return;
      }
      const role = User.role;

      if (role !== "admin") {
        res.sendStatus(403);
        return;
      }
      next();
    } else {
      res.sendStatus(401);
    }
  },
  async authenticateAuthor(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      const decoded = verifyJwt(token);
      if (!decoded) {
        res.sendStatus(401);
        return;
      }
      console.log("decoded", decoded);
      req.body.user = decoded;

      const User = await userRepository.findByIdAsync(decoded.id);
      if (!User) {
        res.sendStatus(401);
        return;
      }
      const role = User.role;

      if (role !== "author") {
        res.sendStatus(403);
        return;
      }
      next();
    } else {
      res.sendStatus(401);
    }
  },
};


export default authenticate;
