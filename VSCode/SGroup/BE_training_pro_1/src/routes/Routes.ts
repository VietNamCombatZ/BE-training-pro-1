import { Router } from 'express';
import AuthRoutes from './authRoutes';

const router = Router();

router.use('/auth', AuthRoutes);

export default router;


//v1
// import { Express } from "express";
// import AuthRoutes from "./authRoutes";

// export const Routes = (app: Express) => {
//   app.use("/auth", AuthRoutes);
// };