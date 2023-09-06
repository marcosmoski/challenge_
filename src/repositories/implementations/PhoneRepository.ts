import { Phone } from "../../entities/Phone";
import { IPhoneRepository } from "../IPhoneRepository";
import axios from "axios";

export class PhoneRepository implements IPhoneRepository {
  private static instance: PhoneRepository;
  private phones: Phone[] = [];

  constructor() {
    if (PhoneRepository.instance) {
      return PhoneRepository.instance;
   }
   PhoneRepository.instance = this;
   this.init();
  }


  async init(): Promise<void> {
    const { data, status } = await axios.get(
      'https://dummyjson.com/products',
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    if (data && status === 200) {
      this.phones = data.products;
    }
  }

  async findPhones(): Promise<Record<string, Phone[]>> {
    const phonesWithDiscountApplyed = this.phones.map((phone) => {
      return {
        ...phone, 
        price: phone.price - (phone.price * (phone.discountPercentage/100))
      }
    }).sort((current, next) => {
      return next.price - current.price 
    })

    const groupedByBrand = phonesWithDiscountApplyed.reduce((result: Record<string, Phone[]>, product: Phone) => {
      const brand = product.brand;
      if (!result[brand]) {
        result[brand] = [];
      }
      result[brand].push(product);
      return result;
    }, {});


    return groupedByBrand;
  }
}