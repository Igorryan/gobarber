import IUserRepository from '@modules/users/repositories/IUserRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '../../../shared/errors/AppError';
import { injectable, inject } from 'tsyringe';


interface IRequest {
  user_id: string,
}

@injectable()
class ShowProfileService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    ){}

  public async execute({ user_id }: IRequest): Promise<User | undefined> {
    const user = await this.usersRepository.findById(user_id);

    if(!user){
      throw new AppError('User not found');
    }

    delete user.password;

    return user;
  }
}

export default ShowProfileService;
