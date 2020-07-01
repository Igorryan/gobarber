import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import UpdateProfileService from '../UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(fakeUsersRepository, fakeHashProvider);
  })

  it('Should be able update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Igor Ryan',
      email: 'igorryan10@gmail.com',
      password: '123456',
    });

    const userUpdated = await updateProfile.execute({
      user_id: user.id,
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
    });

    expect(userUpdated?.name).toBe('Jonh Doe');
    expect(userUpdated?.email).toBe('jonhdoe@example.com');
  });

  it('Should not be able update the profile from non-existing user', async () => {
    await expect(updateProfile.execute({
      user_id: 'non-existing-user',
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      old_password: '123456',
      password: '123123',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Igor Ryan',
      email: 'igorryan10@gmail.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@gmail.com',
      password: '123456',
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Igor Ryan',
      email: 'igorryan10@gmail.com',
    })).rejects.toBeInstanceOf(AppError)
  });

  it('should be able update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Igor Ryan',
      email: 'igorryan10@gmail.com',
      password: '123456',
    });

    const userUpdated = await updateProfile.execute({
      user_id: user.id,
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      old_password: '123456',
      password: '123123',
    });

    expect(userUpdated?.password).toBe('123123');
  });

  it('should not be able update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Igor Ryan',
      email: 'igorryan10@gmail.com',
      password: '123456',
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123123',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Igor Ryan',
      email: 'igorryan10@gmail.com',
      password: '123456',
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: 'wrong-old-password',
      old_password: '123999'
    })).rejects.toBeInstanceOf(AppError);
  });


})
