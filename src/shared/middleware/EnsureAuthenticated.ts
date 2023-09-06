import {Request, Response, NextFunction} from "express"
import { StatusCodes } from "../interfaces/StatusCodes";
import { AuthenticationUseCase } from "./AuthenticationUseCase";
const authenticationUseCase = new AuthenticationUseCase();
export class EnsureAuthenticated {
  constructor() {
  }

  async isAutenticated(request : Request, response: Response, next: NextFunction) {
    const {authorization} = request.headers;
    if (!authorization) {
      return response.status(StatusCodes.UNAUTHORIZED).json({
        error: "Authorization header is missing in your request opearation."
      })
    };

    const [type, token] = authorization.split(" ");
    if (!type || type !== "Bearer") {
      return response.status(StatusCodes.UNAUTHORIZED).json({
        error: "Authorization type is wrong in your request opearation."
      });
    }

    const jwtDataDecoded = authenticationUseCase.verify(token);
    if (jwtDataDecoded === "JWT_KEY_UNDEFINED") {
      response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Error trying to verify your token"
      })
    } else if (jwtDataDecoded === "INVALID_TOKEN") {
      response.status(StatusCodes.UNAUTHORIZED).json({
        error: "Invalid token"
      })
    }

    return next();

  }
}