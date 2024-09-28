import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class authService {
  constructor() {
    this.users = []; 
  }

  async register(username, password) {
    try {
      const userExists = this.users.find((user) => user.username == username);
      if (userExists) {
        throw new Error("user exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      this.users.push({ username, password: hashedPassword });
      console.log(this.users);
      
      
    } catch (err) {
      console.log( err.message);
      throw new Error("register failed");
    
    }
    
  }

  async login(username, password) {
    try {
      const user = this.users.find((user) => user.username == username);
      if (!user) {
        throw new Error ("user not found");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("invalid password");
      }

      const token = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      return token;
      
    } catch (err) {
      console.log( err.message);

      throw new Error( "login failed");
      
    }
    
  }
}

export default new authService();
