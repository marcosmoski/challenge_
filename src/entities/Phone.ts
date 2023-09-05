import { uuid } from 'uuidv4'

export class Phone {
  public readonly id: string;
  public title: string;
  public description: string;
  public price: number;
  public rating: number;
  public thumbnail: number;
  public images: string[];

  constructor(props: Omit<Phone, 'id'>, id?: string) {
    Object.assign(this, props);


    if (!id) {
      this.id = uuid();
    }
  }

}