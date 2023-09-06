import { User } from "../entities/User";

export interface IUsersRepository {
  findByEmail(email: string): Promise<User>;
  findByEmailAndPassword(email: string, password: string): Promise<User> 
  init(): Promise<void>
}