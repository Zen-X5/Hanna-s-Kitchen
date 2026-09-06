import { Injectable } from '@nestjs/common';
import { AuthDto } from './types/auth.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) { }

  async register(authDto: AuthDto) {
    console.log(authDto);

    const newUser = await this.userService
    return { message: 'User registered successfully', data: authDto };
  }
}
