import jwt from "jsonwebtoken"
import  "dotenv/config"


class TokenUtils{
    async encodeToken(user:object){
        return jwt.sign({ id: user.userID }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
          algorithm: "HS256",
        });

    }
}


export default new TokenUtils