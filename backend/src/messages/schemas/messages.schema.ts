import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Message {
  @Prop({ type: Types.ObjectId, required: true, ref: 'User' }) // ID de l'expéditeur
  sender: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'User' }) // ID du destinataire
  receiver: Types.ObjectId;

  @Prop({ required: true })
  content: string;
}

@Schema({ timestamps: true })
export class Conversation extends Document {
  @Prop({ type: [Types.ObjectId], required: true, ref: 'User' })
  participants: Types.ObjectId[];

  @Prop({ type: [Message], default: [] })
  messages: Message[];
}

export const MessageSchema = SchemaFactory.createForClass(Message);
export const ConversationSchema = SchemaFactory.createForClass(Conversation);
