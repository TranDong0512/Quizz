import {Router} from "express";
import UserController from "../controller/user-controller";
import userController from "../controller/user-controller";


export const userRouter = Router();
userRouter.post('/register',UserController.register)
userRouter.post('/login',UserController.login)
userRouter.get('',userController.getAll)
userRouter.delete('',userController.delete)
userRouter.patch('',userController.edit)

