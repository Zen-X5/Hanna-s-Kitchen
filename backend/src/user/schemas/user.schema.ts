
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum UserRole {
    ADMIN = "admin",
    CUSTOMER = "customer"
}

@Schema({ _id: false })
export class Address {
    @Prop()
    district!: string

    @Prop()
    state!: string

    @Prop()
    pin!: string

    @Prop()
    area!: string
}

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true })
    name!: string

    @Prop({ type: String, required: true, unique: true })
    email!: string

    @Prop({ required: true })
    phone?: string;

    @Prop({ required: true })
    password!: string

    @Prop({ type: Address, required: true })
    address!: Address

    @Prop({ enum: UserRole, required: true, default: UserRole.CUSTOMER })
    role!: UserRole

    @Prop({ type: Date, default: null })
    deletedAt!: Date | null
}

export const UserSchema = SchemaFactory.createForClass(User);
