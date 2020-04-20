import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: ShadowRootInit;
}
class CreateUserService {
  public async execure({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const hashPassword = await hash(password, 8);

    const checkUserExists = await usersRepository.findOne({
      where: {
        email,
      },
    });

    if (checkUserExists) {
      throw new AppError('email address already user.', 400);
    }

    const user = usersRepository.create({
      name,
      email,
      password: hashPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
