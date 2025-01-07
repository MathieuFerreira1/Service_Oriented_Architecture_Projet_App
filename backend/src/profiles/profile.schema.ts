import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Profile extends Document {
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    city: string;

    @Prop()
    bio?: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);