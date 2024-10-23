import { Router } from 'express';
import { AuthController } from '../auth/auth.controller';
import  authenticate from '../../middleware/authencation';


const authRouter = Router();

authRouter.get('/', (req,res)=>{res.send('Hello from auth')});

authRouter.post('/register', AuthController.register);

authRouter.post('/login', AuthController.login);

authRouter.get('/user/:id', AuthController.getUser);



authRouter.post('/create-post',authenticate.authenticateJWT , AuthController.createPost);

authRouter.post('/add-admin-to-DB',authenticate.authenticateAdmin, AuthController.addAdmintoDB);

authRouter.post('/add-permission-to-DB', authenticate.authenticateAdmin,AuthController.addPermissiontoDB);

authRouter.post('/add-role-to-DB',authenticate.authenticateAdmin, AuthController.addRoletoDB);

authRouter.post('/add-permission-to-role', authenticate.authenticateAdmin, AuthController.addPermissiontoRole);

authRouter.post('/update-role-to-user', authenticate.authenticateAdmin, AuthController.updateRoletoUser);

authRouter.post('/delete-user', authenticate.authenticateAdmin, AuthController.deleteUser);




export default authRouter;
