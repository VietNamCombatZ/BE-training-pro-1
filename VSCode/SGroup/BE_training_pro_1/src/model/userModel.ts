import { QueryResult } from "typeorm";
import {PoolConnection} from "mysql2/promise"
import pool from "../config/databaseConfig";
import {User} from "../types/user.interface"
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
  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const connection = await pool.getConnection(); // Get a connection
      const query = "SELECT id, email, pass FROM user_db WHERE email = ?";
      const value = [email];

      const rows: User[] | undefined = await connection.query(query, value)[0]; // Ensure TypeScript knows it's an array of Users
      connection.release(); // Release the connection use 

      console.log(rows); // Debugging output

      // If no rows were returned, return undefined
      if (rows.length== 0) {
        return undefined; // No user found
      }

      const user: User = rows[0]; // Get the first user from the result
      return user;
    } catch (error) {
      console.error("Error in getUserByEmail:", error); // Error logging
      throw error; // Optionally rethrow the error
    }
  }
  async setAccesToken(token: string, email: string) {
    try {
      const connection = await pool.getConnection(); // Use await here
      const query = "update user_db set accessToken = ?  where email = ?";
      const value = [token, email];

      await connection.query(query, value);
      connection.release(); // Release the connection

      return true; // Assuming you want to return the first user
    } catch (error) {
      console.error(error); // Handle error appropriately
      throw error; // Optionally rethrow the error
    }
  }
  async setPasswordToken(
    passwordResetToken: string,
    passwordResetExpiration: Date,
    email: string
  ): Promise<boolean> {
    try {
      const connection: PoolConnection = await pool.getConnection();
      const query = `UPDATE users_db SET PasswordResetToken = ?, PasswordResetExpiration = ? WHERE Email = ?`;
      const valueArray = [passwordResetToken, passwordResetExpiration, email];

      await connection.query(query, valueArray);
      connection.release(); // Ensure connection is released
      return true;
    } catch (error) {
      throw error;
    }
  }

  async checkTokenPassword(
    email: string,
    passwordResetToken: string
  ): Promise<any> {
    try {
      const connection: PoolConnection = await pool.getConnection();
      const query = `SELECT * FROM users_db WHERE Email = ? AND PasswordResetToken = ? AND PasswordResetExpiration >= ?`;
      const values = [email, passwordResetToken, new Date(Date.now())];

      const [rows]: any[] = await connection.query(query, values);
      connection.release();
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
  async updatePassword(email: string, password: string): Promise<boolean> {
    try {
      const connection: PoolConnection = await pool.getConnection();
      const query = `UPDATE users_db SET Password = ? WHERE Email = ?`;
      const valueArray = [password, email];

      await connection.query(query, valueArray);
      connection.release();
      return true;
    } catch (error) {
      throw error;
    }
  }
}
export default new UserModel();
