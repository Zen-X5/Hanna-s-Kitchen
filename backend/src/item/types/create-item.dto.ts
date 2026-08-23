import {
    IsArray,
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
    IsBoolean,
    Min,
} from 'class-validator';

import { Category } from '../schemas/item.schema';

export class CreateItemDto {

    @IsString()
    name!: string;

    @IsNumber()
    @Min(0)
    price!: number;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    image?: string[];

    @IsEnum(Category)
    category!: Category;

    @IsOptional()
    @IsNumber()
    @Min(0)
    stock?: number;

    @IsOptional()
    @IsBoolean()
    isAvailable?: boolean;
}