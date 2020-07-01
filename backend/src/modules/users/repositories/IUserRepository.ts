import User from '@modules/users/infra/typeorm/entities/User'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

export default interface IUserRepository {
  findById(id: string): Promise<User | undefined>;
  findAllProviders(except_user_id?: string): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  create({name, email, password}: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;

}
