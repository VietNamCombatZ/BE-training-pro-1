import bcrypt from "bcryptjs" 

class Utils {
  async hashPassword(pass: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);
    return hashedPassword;
  }
  async checkPassword(pass: string, comparePass: string) {
    return await bcrypt.compare(pass, comparePass);
  }
}

export default new Utils;