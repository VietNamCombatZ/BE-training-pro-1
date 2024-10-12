import jwt from "jsonwebtoken";
import UserModel from "../model/userModel.js";
import pool from "../config/databaseConfig.js";
class authMiddleware {
    async checkInput(req, res, next) {
        try {
            const { email, pass } = req.body;
            // console.log({ email, pass });
            const user = await UserModel.getUserByEmail(email);
            if (user != undefined) {
                throw "User already exists";
            }
            next();
        }
        catch (err) {
            console.log("error at validateUser middleware:", err);
            res.status(404).send("Internal server error");
        }
    }
    async validateUser(req, res, next) {
        try {
            const { email, pass } = req.body;
            console.log({ email, pass });
            const conn = await pool.getConnection();
            const [rows] = await conn.query("Select * from user_db where email = ?, pass = ?", [email, pass]);
            conn.release();
            if (Array.isArray(rows) && rows.length > 0) {
                req.user = rows[0];
                next();
            }
            else {
                console.log("invalid email or pass");
                res.status(404).send("invalid email or pass");
            }
        }
        catch (err) {
            console.log("error at validateUser middleware:", err);
            res.status(404).send("Internal server error");
        }
    }
    async verifyToken(req, res, next) {
        // var user = [String, String, String];
        try {
            const authHeader = req.headers["authorization"];
            const token = authHeader && authHeader.split(" ")[1]; //Do token co dang: Bearer token
            if (!token) {
                throw res.status(404).send("invalid token");
            }
            // const decoded = jwt.verify(token, process.env.JWT_SECRET) as String || JwtPayload;
            const secret = process.env.JWT_SECRET;
            console.log(secret);
            const decoded = jwt.verify(token, secret);
            req.user = decoded;
            next();
        }
        catch (err) {
            console.log("error at verifyToken", err);
            res.status(500).send("Internal server error");
        }
    }
}
export default new authMiddleware();
