import { getRepository } from 'typeorm';
import { hash } from 'bcrypt';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';

interface Request {
  name: string;
  password: string;
  email: string;
}

export default class CreateUserService {
  public async execute({ name, password, email }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const userExists = await userRepository.findOne({ where: { email } });

    if (userExists) {
      throw new AppError('Email already used');
    }

    const passwordHash = await hash(password, 8);

    const user = userRepository.create({
      name,
      password: passwordHash,
      email,
    });

    await userRepository.save(user);

    return user;
  }
}
