import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import authController from "../controller/authController"

class AuthRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initRoutes();
  }

  initRoutes() {
    this.router.get("/me",authController.getMe);
    this.router.post("/register", authMiddleware.checkInput, authController.register);
    this.router.post("/login", authMiddleware.validateUser, authController.login);
    this.router.post("/forgot-pass",authController.forgotPass);
    this.router.post("/reset-pass", authController.resetPass);

    this.router.post("/ticket-check", authMiddleware.verifyToken);
    
  }
}


export default new AuthRoutes().router;
