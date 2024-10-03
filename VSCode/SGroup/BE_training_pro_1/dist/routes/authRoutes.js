"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
class authRoutes {
    // private authMiddleware : authMiddleware;
    constructor() {
        this.router = (0, express_1.Router)();
        // this.authMiddleware = new authMiddleware();
        this.initRoutes();
    }
    initRoutes() {
        this.router.post("/login", authMiddleware_1.default.validateUser);
        this.router.post("/ticket-check", authMiddleware_1.default.verifyToken);
        // this.router.post("/forgot-pass" ,authController.forgotPass)
    }
}
exports.default = authRoutes;
