import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviders: ListProvidersService;

describe('ListProviders', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviders = new ListProvidersService(fakeUsersRepository, fakeCacheProvider);
  })

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: "Jonh Doe",
      email: "jonhdoe@gmail.com",
      password: "123456"
    });

    const user2 = await fakeUsersRepository.create({
      name: "John Tree",
      email: "Johntree@gmail.com",
      password: "123456"
    });

    const loggedUser = await fakeUsersRepository.create({
      name: "Igor",
      email: "igorryan@gmail.com",
      password: "123456"
    });

    const providers = await listProviders.execute({ except_user_id: loggedUser.id });

    expect(providers).toStrictEqual([
      user1,
      user2
    ])
  });
})
