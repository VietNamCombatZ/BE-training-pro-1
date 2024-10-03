"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const databaseConfig_1 = __importDefault(require("../config/databaseConfig"));
class authMiddleware {
    validateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, pass } = req.body;
                const conn = yield databaseConfig_1.default.getConnection();
                const [rows] = yield conn.query("Select * from user_db where email = ?, pass = ?", [email, pass]);
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
        });
    }
    verifyToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const decoded = jsonwebtoken_1.default.verify(token, secret);
                req.user = decoded;
                next();
            }
            catch (err) {
                console.log("error at verifyToken", err);
                res.status(500).send("Internal server error");
            }
        });
    }
}
exports.default = new authMiddleware();
