import { MessagesService } from './messages.service';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    getUserConversations(userId: string): Promise<import("./schemas/messages.schema").Conversation[]>;
    getConversationById(conversationId: string): Promise<import("./schemas/messages.schema").Conversation>;
    sendMessage(senderId: string, receiverId: string, content: string): Promise<import("./schemas/messages.schema").Conversation>;
}
