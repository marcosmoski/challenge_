import { Phone } from "../entities/Phone";

export interface IPhoneRepository {
  findPhones(email: string): Promise<Phone>;
}