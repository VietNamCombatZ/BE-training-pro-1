import AuthService from "../service/auth.service.js";
import pool from "../config/databaseConfig.js";
class authController {
    async getMe(req, res) {
        res.status(200).json("Welcome to my web");
        return;
    }
    ;
    async register(req, res) {
        try {
            const { email, pass } = req.body;
            const conn = await pool.getConnection();
            const check = await AuthService.register(email, pass);
            if (!check) {
                res.status(400).json({
                    success: false,
                    message: "User already exists",
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: "User registered successfully",
            });
        }
        catch (err) {
            console.error("Error:", err instanceof Error ? err.message : err); // Log proper error message if available
            res.status(500).json({
                message: "Internal server error at authController-register",
            });
        }
    }
    async login(req, res) {
        try {
            const { email, pass } = req.body;
            // Call the authService to get the login token
            const loginToken = await AuthService.login(email, pass);
            console.log("check", loginToken);
            // If loginToken is valid, return success response
            if (loginToken) {
                res.status(200).json({
                    success: true, // Changed from 'ok' to 'true'
                    token: loginToken,
                });
                return;
            }
            // If loginToken is not valid, return 404 response
            res.status(404).json({
                message: "Invalid email or password", // Fixed invalid JSON structure
            });
            return;
        }
        catch (err) {
            // Log the error and return a 500 response
            console.error("Error:", err instanceof Error ? err.message : err); // Log proper error message if available
            res.status(500).json({
                message: "Internal server error at authController-login",
            });
        }
    }
    async forgotPass(req, res) {
        try {
            const { email } = req.body;
            console.log("start to enter forgotPass service");
            const check = await AuthService.forgotPassword(email);
            console.log(check);
            if (check) {
                res.status(200).json({
                    success: true,
                    message: "Reset password email sent successfully",
                });
                return;
            }
            res.status(400).json({
                success: false,
                message: "Email not found",
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: "Internal server error at authController-forgotPass",
            });
        }
    }
    async resetPass(req, res) {
        try {
            const authHeader = req.headers["authorization"];
            const token = authHeader && authHeader.split(" ")[1]; //Do token co dang: Bearer token
            if (!token) {
                res.status(404).send("invalid token");
                return;
            }
            const { email, newpass } = req.body;
            console.log("resetPass body: ",{ email, newpass });
            const check = await AuthService.resetPassword(email, newpass, token);
            if (check) {
                res.status(200).json({
                    success: true,
                    message: "Password reset successfully",
                });
                return;
            }
            res.status(400).json({
                success: false,
                message: "Invalid token",
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: "Internal server error at authController-resetPass",
            });
        }
    }
}
export default new authController;
