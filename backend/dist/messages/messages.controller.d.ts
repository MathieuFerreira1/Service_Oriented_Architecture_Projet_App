import { MessagesService } from './messages.service';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    getUserConversations(userId: string): Promise<import("./schemas/messages.schema").Conversation[]>;
    getConversation(senderId: string, receiverId: string): Promise<import("./schemas/messages.schema").Conversation>;
    sendMessage(senderId: string, receiverId: string, content: string): Promise<import("./schemas/messages.schema").Conversation>;
}
