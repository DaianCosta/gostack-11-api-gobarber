import { Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import { container } from 'tsyringe';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;

      const creatUserService = container.resolve(CreateUserService);

      const user = await creatUserService.execute({ name, email, password });

      delete user.password;

      return response.status(201).json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
