import {
    IsArray,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsString,
    Min,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDto {

    @IsString()
    @IsNotEmpty()
    itemId!: string;

    @IsNumber()
    @IsInt()
    @Min(1)
    quantity!: number;
}

export class ShippingAddressDto {

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

export class CreateOrderDto {

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items!: OrderItemDto[];

    @ValidateNested()
    @Type(() => ShippingAddressDto)
    shippingAddress!: ShippingAddressDto;
}