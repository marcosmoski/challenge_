

import { UsersRepository } from "../../repositories/implementations/UserRepository";
import { AuthenticationUseCase } from "../../shared/middleware/AuthenticationUseCase";
import { AuthenticationController } from "./AuthenticationController";


const authenticationUseCase = new AuthenticationUseCase();

const usersRepository = new UsersRepository();
const authenticationController = new AuthenticationController(authenticationUseCase, usersRepository);

export { authenticationController }