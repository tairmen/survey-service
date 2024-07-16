import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const user = this.userRepository.create({
      username: createUserDto.username,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }
}
