import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}
class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    const error_essage = 'Incorrect email/password combination.';

    if (!user) {
      throw new AppError(error_essage, 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError(error_essage, 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ subject: user.id, expiresIn }, secret);

    return { user, token };
  }
}

export default AuthenticateUserService;
