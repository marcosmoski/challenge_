import "dotenv/config"
import * as jwt from "jsonwebtoken"
import { IJwtData } from "../interfaces/AuthenticationInterfaces";

export class AuthenticationUseCase {
  constructor(){
  }

  sign(data: IJwtData) {
    if (!process.env.JWT_KEY) return "JWT_KEY_UNDEFINED"
    return jwt.sign(data, process.env.JWT_KEY, {expiresIn: "24h"})
  }

  verify(token: string) : IJwtData | "JWT_KEY_UNDEFINED" |  "INVALID_TOKEN" {
    if (!process.env.JWT_KEY) return "JWT_KEY_UNDEFINED"
    try {
     const decoded = jwt.verify(token, process.env.JWT_KEY);

     if (typeof decoded === "string") {
      return "INVALID_TOKEN"
     }

     return decoded as IJwtData;
    } catch (err) {
      return "INVALID_TOKEN"
    }


  }
}