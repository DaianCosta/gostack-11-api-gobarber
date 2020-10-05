import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserservice from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUserservice = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const createUserservice = new CreateUserservice(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUserservice.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const authResponse = await authenticateUserservice.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });
    expect(authResponse).toHaveProperty('token');
    expect(authResponse.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUserservice = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await expect(
      authenticateUserservice.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUserservice = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const createUserservice = new CreateUserservice(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUserservice.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345634354534',
    });

    await expect(
      authenticateUserservice.execute({
        email: 'johndoe@example.com',
        password: '123456123131233',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
