import { uuid } from 'uuidv4';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '../../infra/typeorm/entities/User';

class UsersRepository implements IUserRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findByUser = this.users.find(user => user.id === id);
    return findByUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findByEmail = this.users.find(user => user.email === email);
    return findByEmail;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;
    return user;
  }
}

export default UsersRepository;