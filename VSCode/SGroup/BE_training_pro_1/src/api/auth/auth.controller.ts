import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { authService } from "./auth.service";
import { User } from "../../model/user.entity";
import { ResponseStatus } from "../../services/serviceResponse";
import { Login } from "./auth.interface";

export const AuthController = {
  async register(req: Request, res: Response) {
    const userData: User = req.body;
    console.log("check data",userData);
    try {
      const serviceResponse = await authService.register(userData);
      res.status(StatusCodes.CREATED).json(serviceResponse);
    } catch (error) {
      const errorMessage = `Error creating user: ${(error as Error).message}`;

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
  async login(req: Request, res: Response) {
    const loginData: Login = req.body;
    console.log(loginData);
    try {
      const serviceResponse = await authService.login(loginData);
      res.status(StatusCodes.OK).json(serviceResponse);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: "Failed",
        message: "Error logging in",
        error: (error as Error).message,
      });
    }
  },
  async getUser(req: Request, res: Response) {
    const userId  = req.params.id;
    try {
        const serviceResponse = await authService.getUser(userId);
        res.status(serviceResponse.code).json(serviceResponse);
    } catch (error) {
        const errorMessage = `Error getting user: ${(error as Error).message}`;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: ResponseStatus.Failed,
            message: errorMessage,
            data: null,
        });
    }
},

async addPermissiontoDB(req: Request, res: Response) {
    try {
      const permissionData = req.body; //data type [] if value passing is array, need destructuring
      console.log(permissionData);
        const serviceResponse = await authService.addPermissiontoDB(permissionData);
        res.status(serviceResponse.code).json(serviceResponse);
    } catch (error) {
        const errorMessage = `Error adding permission to DB: ${(error as Error).message}`;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: ResponseStatus.Failed,
            message: errorMessage,
            data: null,
        });
    }} ,

    async addRoletoDB(req: Request, res: Response) {
        try {
          const roleData = req.body; //data type [] if value passing is array, need destructuring
          console.log(roleData);
            const serviceResponse = await authService.addRoletoDB(roleData);
            res.status(serviceResponse.code).json(serviceResponse);
        } catch (error) {
            const errorMessage = `Error adding role to DB: ${(error as Error).message}`;
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: ResponseStatus.Failed,
                message: errorMessage,
                data: null,
            });
        }},

    async addAdmintoDB(req: Request, res: Response) {
        const adminData: User = req.body;
        console.log("check data", adminData);
        try {
          const serviceResponse = await authService.addAdmintoDB(adminData);
          res.status(StatusCodes.CREATED).json(serviceResponse);
        } catch (error) {
          const errorMessage = `Error creating admin: ${
            (error as Error).message
          }`;

          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: ResponseStatus.Failed,
            message: errorMessage,
            data: null,
          });
        }},
    async createPost(req: Request, res: Response) {
        
        try {
          const postData = req.body;
          console.log("check data", postData);
          const serviceResponse = await authService.createPost(postData);
          res.status(StatusCodes.CREATED).json(serviceResponse);
        } catch (error) {
          const errorMessage = `Error creating post: ${
            (error as Error).message
          }`;

          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: ResponseStatus.Failed,
            message: errorMessage,
            data: null,
          });
        }}
};
