import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";


class authRoutes{
    public router : Router;
    // private authMiddleware : authMiddleware;
    constructor(){
        this.router =Router();
        // this.authMiddleware = new authMiddleware();
        this.initRoutes();
    }
    initRoutes(){
        this.router.post("/login", authMiddleware.validateUser)
        this.router.post("/ticket-check", authMiddleware.verifyToken);
        // this.router.post("/forgot-pass" ,authController.forgotPass)
    }

   
    
   


}

export default authRoutes;