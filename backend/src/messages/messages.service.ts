import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Conversation } from './schemas/messages.schema';

@Injectable()
export class MessagesService {
    constructor(
        @InjectModel(Conversation.name) private conversationModel: Model<Conversation>,
    ) {}

    // Récupérer ou créer une conversation par ID utilisateur
    async getOrCreateConversation(senderId: string, receiverId: string): Promise<Conversation> {
        const senderObjectId = new Types.ObjectId(senderId);
        const receiverObjectId = new Types.ObjectId(receiverId);

        let conversation = await this.conversationModel.findOne({
            participants: { $all: [senderObjectId, receiverObjectId] },
        });

        if (!conversation) {
            conversation = new this.conversationModel({
                participants: [senderObjectId, receiverObjectId],
                messages: [],
            });
            await conversation.save();
        }

        return conversation;
    }

    // Envoyer un message
    async sendMessage(senderId: string, receiverId: string, content: string): Promise<Conversation> {
        const conversation = await this.getOrCreateConversation(senderId, receiverId);

        conversation.messages.push({
            sender: new Types.ObjectId(senderId),
            receiver: new Types.ObjectId(receiverId),
            content,
        });

        return await conversation.save();
    }

    // Récupérer toutes les conversations d'un utilisateur
    async getUserConversations(userId: string): Promise<Conversation[]> {
        return this.conversationModel
            .find({ participants: new Types.ObjectId(userId) })
            .populate('participants', 'username email') // Inclure les infos des utilisateurs
            .exec();
    }

    // Récupérer une conversation spécifique
    async getConversation(senderId: string, receiverId: string): Promise<Conversation> {
        const conversation = await this.conversationModel
            .findOne({
                participants: { $all: [new Types.ObjectId(senderId), new Types.ObjectId(receiverId)] },
            })
            .populate('participants', 'username email')
            .exec();

        if (!conversation) {
            throw new NotFoundException('Conversation not found');
        }

        return conversation;
    }
}