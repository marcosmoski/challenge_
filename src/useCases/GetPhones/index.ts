
import { PhoneRepository } from "../../repositories/implementations/PhoneRepository";
import { GetPhonesController } from "./GetPhonesController";
import { GetPhonesUseCase } from "./GetPhonesUseCase";

const phonesRepository = new PhoneRepository();


const getPhonesUseCase = new GetPhonesUseCase(phonesRepository);


const getPhonesController = new GetPhonesController(getPhonesUseCase);

export { getPhonesController }