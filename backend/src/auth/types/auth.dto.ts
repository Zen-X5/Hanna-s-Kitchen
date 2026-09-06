import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserRole } from '../../user/schemas/user.schema';

export class AddressDto {
    @IsString()
    @IsNotEmpty()
    district!: string;

    @IsString()
    @IsNotEmpty()
    state!: string;

    @IsString()
    @IsNotEmpty()
    pin!: string;

    @IsString()
    @IsNotEmpty()
    area!: string;
}

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(6)
    password!: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => AddressDto)
    address?: AddressDto;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;
}

export class LoginDto {
    @IsEmail()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;
}

// Alias AuthDto to RegisterDto for standard registration payload usage
export class AuthDto extends RegisterDto { }