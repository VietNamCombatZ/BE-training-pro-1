import { Router } from 'express';
import { AuthController } from '../auth/auth.controller';

const authRouter = Router();

authRouter.get('/', (req,res)=>{res.send('Hello from auth')});

authRouter.post('/register', AuthController.register);

authRouter.post('/login', AuthController.login);

authRouter.get('/user/:id', AuthController.getUser);



// authRouter.post('/create-post', AuthController.createPost);

authRouter.post('/add-admin-to-DB', AuthController.addAdmintoDB);

authRouter.post('/add-permission-to-DB', AuthController.addPermissiontoDB);

authRouter.post('/add-role-to-DB', AuthController.addRoletoDB);

export default authRouter;
