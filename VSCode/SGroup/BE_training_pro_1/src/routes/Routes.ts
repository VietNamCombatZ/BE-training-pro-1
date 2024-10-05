import {Express} from 'express';
import AuthRoutes from './authRoutes';

export const Routes = (app: Express) => {
    app.use("/auth", AuthRoutes);}