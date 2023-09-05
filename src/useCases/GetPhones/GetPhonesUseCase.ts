import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUserRepository"
import { IGetPhonesDTO } from "./GetPhonesDTO"

export class GetPhonesUseCase {

  // unica responsabilidade da classe é criar o usuario
  // single responsability principle
  constructor(
    private usersRepository: IUsersRepository,
    // nao dependemos da implementação direta e sim da interface que é o código de menos complexidade (baixo nivel)
    // liscov substitution "não interessa qual repositorio passar para o use case não interessa"
    // a criação do usuario não sabe como faz o envio de email, só o protocolo que é usado, isso é inversão de dependencia
  ) {
  }


  async execute(data: IGetPhonesDTO) {


    return await this.usersRepository.findByEmail(data.email);
  }


}