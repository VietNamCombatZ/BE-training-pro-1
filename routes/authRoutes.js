import { Router } from "express";
import authController from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

class authRoutes {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }

  initRoutes() {
    this.router.post("/login", authController.login); 
    this.router.post("/register", authController.register); 

    
    this.router.get("/me", authMiddleware.verifyToken, authController.me);
  }
}

export default authRoutes;
