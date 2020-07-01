import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProfileService from '@modules/users/services/ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  })

  it('should be able show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: "igor",
      email: "igorryan@gmail.com",
      password: "123456"
    });

    const profile = await showProfile.execute({ user_id: user.id });

    expect(profile?.name).toBe('igor');
    expect(profile?.email).toBe('igorryan@gmail.com');
  });

  it('should be able show the profile from non-existing user', async () => {
    await expect(showProfile.execute({
       user_id: 'non-existing-user-id'
      })).rejects.toBeInstanceOf(AppError);
  });
})
