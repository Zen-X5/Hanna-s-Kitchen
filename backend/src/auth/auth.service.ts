import { Injectable, Logger } from '@nestjs/common';
import { AuthDto } from './types/auth.dto';
import { UserService } from 'src/user/user.service';
import bcrypt from 'bcrypt';
import { UserRole } from 'src/user/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) { }

  async register(authDto: AuthDto) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(authDto.password, saltOrRounds);

    const userPayload = {
      name: authDto.name,
      email: authDto.email,
      password: hashedPassword,
      phone: authDto.phone,
      address: authDto.address,
      role: authDto.role ?? UserRole.CUSTOMER,
    }
    console.log(userPayload);
    const newUser = await this.userService.createUser(userPayload as any)


    return { message: 'User registered successfully', data: newUser };
  }
}
