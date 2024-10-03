import { QueryResult } from "typeorm";
import pool from "../config/databaseConfig";

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

export class UserModel {
  async getUserByEmail(email: string) {
    try {
      const connection = await pool.getConnection(); // Use await here
      const [rows] = await connection.query(
        "select * from user_db where email = ?",
        [email]
      );
      connection.release(); // Release the connection
      return rows; // Assuming you want to return the first user
    } catch (error) {
      console.error(error); // Handle error appropriately
      throw error; // Optionally rethrow the error
    }
  }
}
