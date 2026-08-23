import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ItemDocument = HydratedDocument<Item>;

export enum Category {
    CAKE = "cake",
    LUNCH = "lunch",
    BREAKFAST = "breakfast",
    SNACKS = "snacks"
}

@Schema({ timestamps: true })
export class Item {
    //When you use .populate('userId'), Mongoose can then give you the actual User
    @Prop({ type: Types.ObjectId, ref: "User", required: true })
    userId!: Types.ObjectId

    @Prop({ required: true, trim: true })
    name!: string

    @Prop({ required: true, min: 0 })
    price!: number

    @Prop({ required: false, default: "" })
    description!: string

    @Prop({ type: [String], default: [] })
    image!: string[]

    @Prop({ required: true, enum: Category })
    category!: Category

    @Prop({ required: true, default: 1, min: 0 })
    stock!: number

    @Prop({ type: Boolean, default: true })
    isAvailable!: boolean

    @Prop({ type: Date, default: null })
    deletedAt!: Date | null
}

export const ItemSchema = SchemaFactory.createForClass(Item);
