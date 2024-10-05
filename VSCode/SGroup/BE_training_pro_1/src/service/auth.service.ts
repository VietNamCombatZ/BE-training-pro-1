import { Request, Response, NextFunction, Express } from "express";
import bcrypt from "bcryptjs";
import HashUtils from "../utils/hashUtils";
import TokenUtils from "../utils/tokenUtils";
import mailUtils from "../utils/mailUtils";
import UserModel from "../model/userModel";
import userModel from "../model/userModel";
import pool from "../config/databaseConfig";
import { User } from "../types/user.interface";

class AuthService {
  async register(email: string, pass: string): Promise<boolean> {
    try {
      const query = "INSERT INTO user_db (email, pass) VALUES (?, ?)";
      const values = [email, pass];
      const conn = await pool.getConnection();
      await conn.query(query, values);
      conn.release();
      return true;
    } catch (error) {
      throw error;
    }
  }
  async login(email: string, pass: string): Promise<string> {
    try {
      const user = await UserModel.getUserByEmail(email);
      if (user == undefined) {
        throw "invalid login email";
      }

      const hashedPass = await HashUtils.hashPassword(pass);

      if(user.pass == null){
        throw ("invalid pass")
      }

      const check = await HashUtils.checkPassword(hashedPass, user.pass);
      if (!check) {
        throw "wrong pass";
      }
      const token = await TokenUtils.encodeToken(user);

      const checkSetToken = await userModel.setAccesToken(token, email);
      return token;
    } catch (err) {
      console.log("error at authService-login", err);
      throw "error at authService-login";
    }
  }

  async forgotPassword(email: string): Promise<boolean> {
    try {
      const user = await userModel.getUserByEmail(email);

      if (user == null) {
        return false; // user not exists
      }

      const passwordResetToken: string = await bcrypt.genSalt(10);
      const passwordResetExpiration: Date = new Date(
        Date.now() + 10 * 60 * 1000
      ); // 10 minutes from the time of sending request

      const updateStatus: boolean = await userModel.setPasswordToken(
        passwordResetToken,
        passwordResetExpiration,
        email
      );

      if (updateStatus) {
        await mailUtils.sendEmail({
          emailFrom: "ForgotPass@gmail.com",
          emailTo: email,
          emailSubject: "Reset password",
          emailText: "Here is your reset password token: " + passwordResetToken,
        });
        return true;
      }

      throw new Error("Cannot reset password");
    } catch (error) {
      throw error;
    }
  }
  async resetPassword(
    email: string,
    password: string,
    token: string
  ): Promise<boolean> {
    try {
      const user = await userModel.getUserByEmail(email);

      if (user == null) {
        return false; // user not exists
      }

      const checkToken = await userModel.checkTokenPassword(email, token);

      if (checkToken == null) {
        return false; // invalid token
      }

      const hashedPass = await HashUtils.hashPassword(password);
      const updateStatus: boolean = await userModel.updatePassword(
        hashedPass,
        email
      );

      if (updateStatus) {
        return true;
      }

      throw new Error("Cannot reset password");
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService();
