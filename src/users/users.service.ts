import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
    ) { }

    async findAll() {
        return this.usersRepository.findAll();
    }

    async findByEmail(email: string) {
        return this.usersRepository.findByEmail(email);
    }

    async findByCpf(cpf: string) {
        return this.usersRepository.findByCpf(cpf);
    }

    async findOne(id: number) {
        const user = await this.usersRepository.findOne(id);
        
        if (user.length === 0) {
            throw new NotFoundException('Usuário não encontrado');
        }

        return user[0];
    }
}
