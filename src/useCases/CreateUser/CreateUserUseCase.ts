import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUserRepository"
import { ICreateUserDTO } from "./CreateUserDTO"

export class CreateUserUseCase {

  // unica responsabilidade da classe é criar o usuario
  // single responsability principle
  constructor(
    private usersRepository: IUsersRepository,
    // nao dependemos da implementação direta e sim da interface que é o código de menos complexidade (baixo nivel)
    // liscov substitution "não interessa qual repositorio passar para o use case não interessa"
    private mailProvider: IMailProvider
    // a criação do usuario não sabe como faz o envio de email, só o protocolo que é usado, isso é inversão de dependencia
  ) {
  }


  async execute(data: ICreateUserDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error('User already exists;');
    }

    const user = new User(data);

    await this.usersRepository.save(user);

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email
      },
      from: {
        name: data.name,
        email: data.email
      },
      subject: 'Seja bem vindo a plataforma da docato',
      body: '<p> Você já pode efetuar login. </p>'
    });

    return;
  }


}