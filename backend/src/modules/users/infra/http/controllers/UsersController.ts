import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import { classToClass } from 'class-transformer';

export default class UsersController{
  public async create(request: Request, response: Response): Promise<Response>{
    const { name, email, password } = request.body;

    const createUsers = container.resolve(CreateUserService)

    const user = await createUsers.execute({
      name, email, password
    })

    return response.json(classToClass(user));

  }
}
