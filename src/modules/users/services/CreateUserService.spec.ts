import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserservice from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserservice = new CreateUserservice(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUserservice.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserservice = new CreateUserservice(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUserservice.execute({
      name: 'John Doe2',
      email: 'johndoe2@example.com',
      password: '123456',
    });

    await expect(
      createUserservice.execute({
        name: 'John Doe2',
        email: 'johndoe2@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
