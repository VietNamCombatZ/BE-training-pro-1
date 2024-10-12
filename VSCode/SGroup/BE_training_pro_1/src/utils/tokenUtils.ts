import jwt from "jsonwebtoken"
import {User} from "../types/user.interface"
import  "dotenv/config"


class TokenUtils{
    async encodeToken(user:User) :Promise <string>{

      const secret = process.env.JWT_SECRET;
      const validTime = process.env.JWT_EXPIRES_IN

      if(!secret || !validTime){
        throw ("invalid secret or valid time")
      }
        return jwt.sign({ id: user.id }, secret, {
          expiresIn: validTime,
          algorithm: "HS256",
        });

    }
}


export default new TokenUtils