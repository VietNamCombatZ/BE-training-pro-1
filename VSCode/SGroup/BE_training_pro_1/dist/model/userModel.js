import pool from "../config/databaseConfig.js";
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
    async getUserByEmail(email) {
        try {
            const connection = await pool.getConnection(); // Get a connection
            const query = "SELECT id, email, pass FROM user_db WHERE email = ?";
            const value = [email];
            const [rows] = await connection.query(query, value); // Ensure TypeScript knows it's an array of Users
            connection.release(); // Release the connection use 
            console.log("GetuserbyEmail",rows); // Debugging output
            // If no rows were returned, return undefined
            if (rows.length == 0) {
                return undefined; // No user found
            }
            const user = rows[0]; // Get the first user from the result
            return user;
        }
        catch (error) {
            console.error("Error in getUserByEmail:", error); // Error logging
            throw error; // Optionally rethrow the error
        }
    }
    async setAccesToken(token, email) {
        try {
            const connection = await pool.getConnection(); // Use await here
            const query = "update user_db set accessToken = ?  where email = ?";
            const value = [token, email];
            await connection.query(query, value);
            connection.release(); // Release the connection
            return true; // Assuming you want to return the first user
        }
        catch (error) {
            console.error(error); // Handle error appropriately
            throw error; // Optionally rethrow the error
        }
    }
    async setPasswordToken(passwordResetToken, passwordResetExpiration, email) {
        try {
            const connection = await pool.getConnection();
            console.log("connection established"); 
            const query = `UPDATE user_db SET PasswordResetToken = ?, PasswordResetExpiration = ? WHERE Email = ?`;
            const valueArray = [passwordResetToken, passwordResetExpiration, email];
            console.log("start update query");
            await connection.query(query, valueArray);
            console.log("end update query");
            connection.release(); // Ensure connection is released
            console.log("Password Reset Token set successfully");
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    async checkTokenPassword(email, passwordResetToken) {
        try {
            const connection = await pool.getConnection();
            const query = `SELECT * FROM user_db WHERE Email = ? AND PasswordResetToken = ? AND PasswordResetExpiration >= ?`;
            const values = [email, passwordResetToken, new Date(Date.now())];
            const [rows] = await connection.query(query, values);
            connection.release();
            return rows[0];
        }
        catch (error) {
            throw error;
        }
    }
    async updatePassword(email, password) {
        try {
            const connection = await pool.getConnection();
            const query = `UPDATE user_db SET pass = ? WHERE email = ?`;
            const valueArray = [password, email];
            await connection.query(query, valueArray);
            connection.release();
            return true;
        }
        catch (error) {
            throw error;
        }
    }
}
export default new UserModel();
