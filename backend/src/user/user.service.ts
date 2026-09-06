import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './types/create-user.dto';

@Injectable()
export class UserService {
    async createUser(createUserDto: CreateUserDto) {

    }
}
