
import { PostgresUsersRepository } from "../../repositories/implementations/PostgresUserRepository";
import { GetPhonesController } from "./GetPhonesController";
import { GetPhonesUseCase } from "./GetPhonesUseCase";

const postgresUsersRepository = new PostgresUsersRepository();


const createUserUseCase = new GetPhonesUseCase(postgresUsersRepository);


const createUserController = new GetPhonesController(createUserUseCase);

export { createUserController }