import { Model } from 'mongoose';
import { Conversation } from './schemas/messages.schema';
export declare class MessagesService {
    private conversationModel;
    constructor(conversationModel: Model<Conversation>);
    getOrCreateConversation(senderId: string, receiverId: string): Promise<Conversation>;
    sendMessage(senderId: string, receiverId: string, content: string): Promise<Conversation>;
    getUserConversations(userId: string): Promise<Conversation[]>;
    getConversation(senderId: string, receiverId: string): Promise<Conversation>;
    getConversationById(conversationId: string): Promise<Conversation>;
}
