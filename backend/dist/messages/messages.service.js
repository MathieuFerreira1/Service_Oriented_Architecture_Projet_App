"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const messages_schema_1 = require("./schemas/messages.schema");
let MessagesService = class MessagesService {
    constructor(conversationModel) {
        this.conversationModel = conversationModel;
    }
    async getOrCreateConversation(senderId, receiverId) {
        const senderObjectId = new mongoose_2.Types.ObjectId(senderId);
        const receiverObjectId = new mongoose_2.Types.ObjectId(receiverId);
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
    async sendMessage(senderId, receiverId, content) {
        const conversation = await this.getOrCreateConversation(senderId, receiverId);
        conversation.messages.push({
            sender: new mongoose_2.Types.ObjectId(senderId),
            receiver: new mongoose_2.Types.ObjectId(receiverId),
            content,
        });
        return await conversation.save();
    }
    async getUserConversations(userId) {
        return this.conversationModel
            .find({ participants: new mongoose_2.Types.ObjectId(userId) })
            .populate('participants', 'username email')
            .exec();
    }
    async getConversation(senderId, receiverId) {
        const conversation = await this.conversationModel
            .findOne({
            participants: {
                $all: [new mongoose_2.Types.ObjectId(senderId), new mongoose_2.Types.ObjectId(receiverId)],
            },
        })
            .populate('participants', 'username email')
            .exec();
        if (!conversation) {
            throw new common_1.NotFoundException('Conversation not found');
        }
        return conversation;
    }
    async getConversationById(conversationId) {
        const conversation = await this.conversationModel
            .findById(conversationId)
            .populate('participants', 'username email')
            .exec();
        if (!conversation) {
            throw new common_1.NotFoundException('Conversation not found');
        }
        return conversation;
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(messages_schema_1.Conversation.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MessagesService);
//# sourceMappingURL=messages.service.js.map