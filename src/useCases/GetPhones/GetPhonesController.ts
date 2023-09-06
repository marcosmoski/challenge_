import { Request, Response } from 'express'
import { GetPhonesUseCase } from './GetPhonesUseCase'
import { Phone } from '../../entities/Phone';

export class GetPhonesController {

  constructor(
    private getPhonesUseCase: GetPhonesUseCase
  ) {
  }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const phones = await this.getPhonesUseCase.execute();
      return response.status(201).json(phones);
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      });
    }


  }

}