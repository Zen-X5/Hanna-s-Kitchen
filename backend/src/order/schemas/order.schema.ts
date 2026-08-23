import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Address } from 'src/user/schemas/user.schema';

export type OrderDocument = HydratedDocument<Order>;

export enum Status {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    PREPARING = 'preparing',
    OUT_FOR_DELIVERY = 'out_for_delivery',
    DELIVERED = 'delivered',
    CANCELLED = 'cancelled',
}

@Schema({ _id: false })
export class OrderItem {

    @Prop({
        type: Types.ObjectId,
        ref: 'Item',
        required: true,
    })
    itemId!: Types.ObjectId;

    @Prop({
        required: true,
        min: 1,
    })
    quantity!: number;

    @Prop({
        required: true,
        min: 0,
    })
    price!: number;
}

@Schema({ timestamps: true })
export class Order {

    @Prop({
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    })
    userId!: Types.ObjectId;

    @Prop({
        type: [OrderItem],
        default: [],
    })
    items!: OrderItem[];

    @Prop({
        required: true,
        min: 0,
    })
    totalAmount!: number;

    @Prop({
        required: true,
        type: Address,
    })
    shippingAddress!: Address;

    @Prop({
        enum: Status,
        required: true,
        default: Status.PENDING,
    })
    status!: Status;
}

export const OrderSchema = SchemaFactory.createForClass(Order);