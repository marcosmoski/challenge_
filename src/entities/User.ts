import { uuid } from 'uuidv4'

export class User {
  public readonly id: string;
  public firstName: string;
  public lastName: string;
  public username: string;
  public password: string;
  public age: number;

  constructor(props: Omit<User, 'id'>, id?: string) {
    Object.assign(this, props);


    if (!id) {
      this.id = uuid();
    }
  }

}