import { Phone } from "../entities/Phone";

export interface IPhoneRepository {
  findPhones(): Promise<Record<string, Phone[]>>;
  init(): Promise<void>
}