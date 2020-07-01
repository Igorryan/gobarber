import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateAvatar: UpdateUserAvatarService

describe('UpdateUserAvatar', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);
  })

  it('should be able to upload avatar that not exists', async () => {
    const user = await fakeUsersRepository.create({
      name: "igor",
      email: "igorryan@gmail.com",
      password: "123456"
    });

    await updateAvatar.execute({
      user_id: user.id,
      avatarFileName: "avatar.jpg"
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar from non existing user', async () => {
    await expect(updateAvatar.execute({
      user_id: 'non-existing-user',
      avatarFileName: "avatar.jpg"
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: "igor",
      email: "igorryan@gmail.com",
      password: "123456"
    });

    await updateAvatar.execute({
      user_id: user.id,
      avatarFileName: "avatar.jpg"
    });

    await updateAvatar.execute({
      user_id: user.id,
      avatarFileName: "avatar2.jpg"
    })

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
})
