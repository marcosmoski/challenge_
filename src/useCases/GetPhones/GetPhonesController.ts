import { Request, Response } from 'express'
import { GetPhonesUseCase } from './GetPhonesUseCase'

export class GetPhonesController {

  constructor(
    private getPhonesUseCase: GetPhonesUseCase
  ) {
  }

  async handle(request: Request, response: Response): Promise<Response> {

    const { name, email, password } = request.body;

    try {
      await this.getPhonesUseCase.execute({
        name,
        email,
        password
      });

      return response.status(201).send();
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      });
    }


  }

}