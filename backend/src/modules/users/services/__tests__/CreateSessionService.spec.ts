import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import CreateSessionService from '@modules/users/services/CreateSessionService';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';


let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUser: CreateUserService;
let createSession: CreateSessionService;

describe('CreateSession', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider, fakeCacheProvider)
    createSession = new CreateSessionService(fakeUsersRepository, fakeHashProvider);
  })

  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'Igor Ryan',
      email: 'igorryan10@gmail.com',
      password: '123456',
    });

    const response = await createSession.execute({
      email: 'igorryan10@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);

  });

  it('should not be able to authenticate an email that does not exist', async () => {
    await expect(createSession.execute({
      email: 'igorryan10@gmail.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate an incorrect password', async () => {
    await createUser.execute({
      name: 'Igor Ryan',
      email: 'igorryan10@gmail.com',
      password: '123456',
    });

    await expect(createSession.execute({
      email: 'igorryan10@gmail.com',
      password: '1234567',
    })).rejects.toBeInstanceOf(AppError)
  });
})
