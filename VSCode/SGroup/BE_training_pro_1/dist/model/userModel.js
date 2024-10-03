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
exports.UserModel = void 0;
const databaseConfig_1 = __importDefault(require("../config/databaseConfig"));
// export class User {
//   public email: string;
//   public password: string;
//   public resetToken?: string;
//   constructor(email: string, password: string, resetToken?: string) {
//     this.email = email;
//     this.password = password;
//     this.resetToken = resetToken;
//   }
// }
class UserModel {
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield databaseConfig_1.default.getConnection(); // Use await here
                const [rows] = yield connection.query("select * from user_db where email = ?", [email]);
                connection.release(); // Release the connection
                return rows; // Assuming you want to return the first user
            }
            catch (error) {
                console.error(error); // Handle error appropriately
                throw error; // Optionally rethrow the error
            }
        });
    }
}
exports.UserModel = UserModel;
