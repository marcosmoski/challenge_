
import { IPhoneRepository } from "../../repositories/IPhoneRepository";

export class GetPhonesUseCase {
  constructor(
    private phonesRepository: IPhoneRepository
  ) {
  }


  async execute() {
    return await this.phonesRepository.findPhones();
  }


}