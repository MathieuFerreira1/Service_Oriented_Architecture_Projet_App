import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string; // Stockage du mot de passe haché

  @Prop()
  city: string; // Ville où habite l'utilisateur

  @Prop()
  bio: string; // Biographie ou description personnelle

  @Prop({ default: Date.now })
  createdAt: Date; // Date de création du compte
}

export const UserSchema = SchemaFactory.createForClass(User);
