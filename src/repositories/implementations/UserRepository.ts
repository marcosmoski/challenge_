import { User } from "../../entities/User";
import { IUsersRepository } from "../IUserRepository";
import axios from "axios";

export class UsersRepository implements IUsersRepository {
  private static instance: UsersRepository;
  private users: User[] = [];

  constructor() {
    if (UsersRepository.instance) {
      return UsersRepository.instance;
   }
   UsersRepository.instance = this;
   this.init();
  }



  async findByEmail(email: string): Promise<User> {
    const user = this.users.find(user => user.email === email)

    return user;
  }

  async init(): Promise<void> {
    const { data, status } = await axios.get(
      'https://dummyjson.com/users',
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    if (data && status === 200) {
      this.users = data.users;
    }
  }

  async findByEmailAndPassword(email: string, password: string): Promise<User> {
    const user = this.users.find(user => user.email === email && user.password === password)

    return user;
  }
}