import { IsString, IsNotEmpty, IsEmail, IsEnum, ValidateNested } from "class-validator"
import { UserRole } from "../schemas/user.schema"
import { Type } from "class-transformer"


export class CreateUserAddressDto {

    @IsNotEmpty()
    @IsString()
    district!: string

    @IsNotEmpty()
    @IsString()
    state!: string

    @IsNotEmpty()
    @IsString()
    area!: string

    @IsNotEmpty()
    @IsString()
    pin!: string
}

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    name!: string

    @IsNotEmpty()
    @IsEmail()
    email!: string

    @IsNotEmpty()
    @IsString()
    phone!: string

    @IsNotEmpty()
    @IsString()
    password!: string

    @IsNotEmpty()
    @IsEnum(UserRole)
    role!: UserRole

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CreateUserAddressDto)
    address!: CreateUserAddressDto

}