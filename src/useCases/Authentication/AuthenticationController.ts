import { Request, Response } from 'express'
import { StatusCodes } from "../../shared/interfaces/StatusCodes";
import { AuthenticationUseCase } from "../../shared/middleware/AuthenticationUseCase";
import { IUsersRepository } from '../../repositories/IUserRepository';


export class AuthenticationController { 
  constructor(private authenticationUseCase: AuthenticationUseCase,
             private usersRepository: IUsersRepository) {}

  async handle(request: Request, response: Response) {
    const {email, password} = request.body;
    const userFound = await this.usersRepository.findByEmailAndPassword(email, password);

    if (!userFound || !userFound.email) {
      return response.status(StatusCodes.UNAUTHORIZED).json({
        error: "User not found."
      })
    }
    const {firstName, lastName, username, age} = userFound;
    const accessToken = this.authenticationUseCase.sign(
      { 
        firstName,
        lastName,
        username,
        age
      });
      
    if (accessToken === "JWT_KEY_UNDEFINED") {
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "We found an error generating your access token."
      })
    }

    return response.status(StatusCodes.SUCCESS).json({
      accessToken
    })
  }
}