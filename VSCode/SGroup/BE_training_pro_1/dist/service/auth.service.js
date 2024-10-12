import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import HashUtils from "../utils/hashUtils.js";
import TokenUtils from "../utils/tokenUtils.js";
import mailUtils from "../utils/mailUtils.js";
import UserModel from "../model/userModel.js";
import userModel from "../model/userModel.js";
import pool from "../config/databaseConfig.js";
import "dotenv/config";
class AuthService {
    async register(email, pass) {
        try {
            
            const hashedPass = await HashUtils.hashPassword(pass);
            const query = "INSERT INTO user_db (email, pass) VALUES (?, ?)";
            const values = [email, hashedPass];
            const conn = await pool.getConnection();
            await conn.query(query, values);
            conn.release();
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    async login(email, pass) {
        try {
            const user = await UserModel.getUserByEmail(email);
            console.log("check",user);
            if (user == undefined) {
                throw "invalid login email";
            }
            
            if (user.pass == null) {
                throw ("invalid pass");
            }
            
            const check = await HashUtils.checkPassword(pass, user.pass);
            
            if (!check) {
                throw "wrong pass";
            }
            const token = await TokenUtils.encodeToken(user);
            const checkSetToken = await userModel.setAccesToken(token, email);
            return token;
        }
        catch (err) {
            console.log("error at authService-login", err);
            throw "error at authService-login";
        }
    }
    async forgotPassword(email) {
        try {
            const user = await userModel.getUserByEmail(email);
            console.log("forgotpassService user check:",user);
            if (user == null) {
                return false; // user not exists
            }
            console.log("start create reset token");
            // const passwordResetToken = await bcrypt.genSalt(10);
            const passwordResetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
              expiresIn: process.env.JWT_EXPIRES_IN,
            });
            console.log(passwordResetToken);
            const passwordResetExpiration = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from the time of sending request
            console.log(passwordResetExpiration);
            console.log("end create reset token");
            const updateStatus = await userModel.setPasswordToken(passwordResetToken, passwordResetExpiration, email);
            console.log("Start to send email");
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
        }
        catch (error) {
            throw error;
        }
    }
    async resetPassword(email, password, token) {
        try {
            const user = await userModel.getUserByEmail(email);
            if (user == null) {
                return false; // user not exists
            }
            console.log("start check token");
            const checkToken = await userModel.checkTokenPassword(email, token);
            if (checkToken == null) {
                return false; // invalid token
            }
            console.log("end check token");
            const hashedPass = await HashUtils.hashPassword(password);
            console.log("start update password");
            const updateStatus = await userModel.updatePassword( email,hashedPass);
            console.log(updateStatus);
            if (updateStatus) {
                return true;
            }
            throw new Error("Cannot reset password");
        }
        catch (error) {
            throw error;
        }
    }
}
export default new AuthService();
